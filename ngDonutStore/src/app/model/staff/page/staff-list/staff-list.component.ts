import { IdentityService } from './../../../../core/services/identity.service';
import { WorkingCalenderService } from './../../../working-calender/service/working-calender.service';
import { WorkingCalender } from './../../../working-calender/working-calender';
import { StoreService } from './../../../store/service/store.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Staff } from '../../staff';
import { CONFIG } from '../../../../shared/constants/configuration.constant';
import { Subscription } from 'rxjs/Subscription';
import { StaffService } from '../../service/staff.service';
import { SortService } from '../../../../core/services/sort.service';
import { sortByProperty } from '../../../../shared/helpers/data.helper';
import { Store } from '../../../store/store';

declare var $: any;
@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit, OnDestroy {

  listStaff: Staff[];
  oldStaff: Staff;
  listStore: Store[];
  listWorkingCalender: WorkingCalender[];
  isAdmin = false;

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
    storeId: '',
    workingCalenderId: '',
    page: 0,
    size: CONFIG.PAGE_SIZE,
    sort: 'id,desc'
  }
  enabled = [
    { view: 'Active', value: 'true' },
    { view: 'In-Active', value: 'false' }
  ]

  private subListStaff: Subscription;
  private subSortService: Subscription;
  private subStaff: Subscription;
  private subListStore: Subscription;
  private subListWorkingCalender: Subscription;

  constructor(private storeService: StoreService,
    private workingCalenderService: WorkingCalenderService,
    private staffService: StaffService,
    private identityService: IdentityService,
    private sortService: SortService,
  ) {
    this.subSortService = this.sortService.columnSorted$.subscribe(colName => {
      this.sort(colName);
    });
    this.isAdmin = this.identityService.isAdmin();
  }

  ngOnInit() {
    this.findList();
    this.subListStore = this.storeService.findAll()
      .subscribe(response => {
        this.listStore = response;
      });
    this.subListWorkingCalender = this.workingCalenderService.findAll()
      .subscribe(response => {
        this.listWorkingCalender = response;
      })
  }

  ngOnDestroy(): void {
    if (this.subListStaff)
      this.subListStaff.unsubscribe();
    if (this.subSortService)
      this.subSortService.unsubscribe();
    if (this.subStaff)
      this.subStaff.unsubscribe();
    if (this.subListStore)
      this.subListStore.unsubscribe();
    if (this.subListWorkingCalender)
      this.subListWorkingCalender.unsubscribe();
  }

  onFilter() {
    this.params.page = 0;
    this.findList();
  }

  findList() {
    this.subListStaff = this.staffService.findList(this.params)
      .subscribe(response => {
        this.error.isError = false;
        this.listStaff = response.content;
        if (this.listStaff.length === 0) {
          this.notFoundMessage = "We're not found any contents";
        } else {
          this.notFoundMessage = "";
        }
        this.requestPage = response;
      }, error => {
        this.error.isError = true;
        this.error.message = error.error;
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
    this.listStaff.sort(sortByProperty(property, this.sortDirection));
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

  staffSubmitted(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_add').modal('toggle');
    }
  }

  staffUpdated(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_update').modal('toggle');
    }
  }

  onDetail(staff) {
    this.oldStaff = staff;
    this.staffService.setStaff(JSON.parse(JSON.stringify(staff)));
    $('#modal_update').appendTo("body").modal('show');
  }

  onEnabledOrNot(id) {
    this.subStaff = this.staffService.enabledOrNot({ id: id })
      .subscribe(response => {
        this.error.isError = false;
        this.findList();
      }, error => {
        this.error.isError = true;
        this.error.message = error.error;
      })
  }

}
