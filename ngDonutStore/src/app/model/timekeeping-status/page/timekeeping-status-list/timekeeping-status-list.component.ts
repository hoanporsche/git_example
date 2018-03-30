import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimekeepingStatus } from '../../timekeeping-status';
import { CONFIG } from '../../../../shared/constants/configuration.constant';
import { Subscription } from 'rxjs/Subscription';
import { TimekeepingStatusService } from '../../service/timekeeping-status.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SortService } from '../../../../core/services/sort.service';
import { sortByProperty } from '../../../../shared/helpers/data.helper';

declare var $: any;
@Component({
  selector: 'app-timekeeping-status-list',
  templateUrl: './timekeeping-status-list.component.html',
  styleUrls: ['./timekeeping-status-list.component.css']
})
export class TimekeepingStatusListComponent implements OnInit, OnDestroy {

  listTimekeepingStatus: TimekeepingStatus[];
  oldTimekeepingStatus: TimekeepingStatus;

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

  private subListTimekeepingStatus: Subscription;
  private subSortService: Subscription;
  private subTimekeepingStatus: Subscription;

  constructor(private timekeepingStatusService: TimekeepingStatusService,
    private navigationService: NavigationService,
    private sortService: SortService
  ) {
    this.listTimekeepingStatus = [];
    this.subSortService = this.sortService.columnSorted$.subscribe(colName => {
      this.sort(colName);
    });
  }

  ngOnInit() {
    this.findList();
  }

  ngOnDestroy(): void {
    if (this.subListTimekeepingStatus)
      this.subListTimekeepingStatus.unsubscribe();
    if (this.subSortService)
      this.subSortService.unsubscribe();
    if (this.subTimekeepingStatus)
      this.subTimekeepingStatus.unsubscribe();
  }

  findList() {
    this.subListTimekeepingStatus = this.timekeepingStatusService.findList(this.params)
      .subscribe(response => {
        this.error.isError = false;
        this.listTimekeepingStatus = response.content;
        if (this.listTimekeepingStatus.length === 0) {
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
    this.listTimekeepingStatus.sort(sortByProperty(property, this.sortDirection));
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

  timekeepingStatusSubmitted(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_add').modal('toggle');
    }
  }

  timekeepingStatusUpdated(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_update').modal('toggle');
    }
  }

  onDetail(timekeepingStatus) {
    this.oldTimekeepingStatus = timekeepingStatus;
    this.timekeepingStatusService.setTimekeepingStatus(JSON.parse(JSON.stringify(timekeepingStatus)));
    $('#modal_update').appendTo("body").modal('show');
  }

  onEnabledOrNot(id) {
    this.subTimekeepingStatus = this.timekeepingStatusService.enabledOrNot({ id: id })
      .subscribe(response => {
        this.error.isError = false;
        this.findList();
      }, error => {
        this.error.isError = true;
        this.error.message = error.error;
      })
  }

}
