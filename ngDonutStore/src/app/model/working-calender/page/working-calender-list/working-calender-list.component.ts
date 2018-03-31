import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkingCalender } from '../../working-calender';
import { CONFIG } from '../../../../shared/constants/configuration.constant';
import { Subscription } from 'rxjs/Subscription';
import { WorkingCalenderService } from '../../service/working-calender.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SortService } from '../../../../core/services/sort.service';
import { sortByProperty } from '../../../../shared/helpers/data.helper';

declare var $:any;
@Component({
  selector: 'app-working-calender-list',
  templateUrl: './working-calender-list.component.html',
  styleUrls: ['./working-calender-list.component.css']
})
export class WorkingCalenderListComponent implements OnInit, OnDestroy {

  listWorkingCalender: WorkingCalender[];
  oldWorkingCalender: WorkingCalender;

  requestPage;
  notFoundMessage = '';
  error = {
    isError: false,
    message: ''
  };

  sortDirection = 0;
  currentSortProperty = '';

  params = {
    enabled: '',
    page: 0,
    size: CONFIG.PAGE_SIZE,
    sort: 'id,desc'
  }
  enabled = [
    { view: 'Active', value: 'true' },
    { view: 'In-Active', value: 'false' }
  ]

  private subListWorkingCalender: Subscription;
  private subSortService: Subscription;
  private subWorkingCalender: Subscription;

  constructor(private workingCalenderService: WorkingCalenderService,
    private navigationService: NavigationService,
    private sortService: SortService
  ) {
    this.listWorkingCalender = [];
    this.subSortService = this.sortService.columnSorted$.subscribe(colName => {
      this.sort(colName);
    });
  }

  ngOnInit() {
    this.findList();
  }

  ngOnDestroy(): void {
    if (this.subListWorkingCalender)
      this.subListWorkingCalender.unsubscribe();
    if (this.subSortService)
      this.subSortService.unsubscribe();
    if (this.subWorkingCalender)
      this.subWorkingCalender.unsubscribe();
  }

  onFilter() {
    this.params.page = 0;
    this.findList();
  }

  findList() {
    this.subListWorkingCalender = this.workingCalenderService.findList(this.params)
      .subscribe(response => {
        this.error.isError = false;
        this.listWorkingCalender = response.content;
        if (this.listWorkingCalender.length === 0) {
          this.notFoundMessage = "We're not found any contents";
        } else {
          this.notFoundMessage = "";
        }
        this.requestPage = response;
      }, (error: Error) => {
        this.error.isError = true;
        this.error.message = error.message;
      })
  }

  sort(property: string) {
    if (this.currentSortProperty === '') {
      this.currentSortProperty = property;
    }
    if (this.currentSortProperty !== property) {
      this.sortDirection = 0;
      this.currentSortProperty = property;
    }
    this.sortDirection = (this.sortDirection === 0) ? 1 : (this.sortDirection === 1) ? -1 : 0;
    this.listWorkingCalender.sort(sortByProperty(property, this.sortDirection));
  }

  first() {
    if (!this.requestPage.first) {
      this.params.page = 0;
      this.findList();
    }
  }

  prev() {
    if (!this.requestPage.first) {
      this.params.page = this.requestPage.number - 1;
      this.findList();
    }

  }

  next() {
    if (!this.requestPage.last) {
      this.params.page = this.requestPage.number + 1;
      this.findList();
    }
  }

  last() {
    if (!this.requestPage.last) {
      this.params.page = this.requestPage.totalPages - 1;
      this.findList();
    }
  }

  openModal() {
    $('#modal_add').appendTo("body").modal({ show: true, backdrop: 'static' });
  }

  workingCalenderSubmitted(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_add').modal('toggle');
    }
  }

  workingCalenderUpdated(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_update').modal('toggle');
    }
  }

  onDetail(workingCalender) {
    this.oldWorkingCalender = workingCalender;
    this.workingCalenderService.setWorkingCalender(JSON.parse(JSON.stringify(workingCalender)));
    $('#modal_update').appendTo("body").modal('show');
  }

  onEnabledOrNot(id) {
    this.subWorkingCalender = this.workingCalenderService.enabledOrNot({ id: id })
      .subscribe(response => {
        this.error.isError = false;
        this.findList();
      }, error => {
        this.error.isError = true;
        this.error.message = error.error;
      })
  }

}
