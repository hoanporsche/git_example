import { TimekeepingStatus } from './../../../timekeeping-status/timekeeping-status';
import { TimekeepingStatusService } from './../../../timekeeping-status/service/timekeeping-status.service';
import { StaffService } from './../../../staff/service/staff.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Timekeeping } from '../../timekeeping';
import { CONFIG } from '../../../../shared/constants/configuration.constant';
import { Subscription } from 'rxjs/Subscription';
import { TimekeepingService } from '../../service/timekeeping.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SortService } from '../../../../core/services/sort.service';
import { sortByProperty } from '../../../../shared/helpers/data.helper';
import { StoreService } from '../../../store/service/store.service';
import { Staff } from '../../../staff/staff';
import { Store } from '../../../store/store';
import { IdentityService } from '../../../../core/services/identity.service';

@Component({
  selector: 'app-timekeeping-list',
  templateUrl: './timekeeping-list.component.html',
  styleUrls: ['./timekeeping-list.component.css']
})
export class TimekeepingListComponent implements OnInit, OnDestroy {

  listTimekeeping: Timekeeping[];
  listStatus: TimekeepingStatus[];
  listStaff: Staff[];
  listStore: Store[];

  isAdmin = false;
  requestPage;
  notFoundMessage = '';
  error = {
    isError: false,
    message: ''
  };

  sortDirection = 0;
  currentSortProperty = '';

  private params = {
    staffId: '',
    statusId: '',
    storeId: '',
    dateStart: '',
    dateEnd: '',
    page: 0,
    size: CONFIG.PAGE_SIZE,
    sort: 'id,desc'
  }

  private subListTimekeeping: Subscription;
  private subSortService: Subscription;
  private subListStatus: Subscription;
  private subListStaff: Subscription;
  private subListStore: Subscription;

  constructor(private timekeepingService: TimekeepingService,
    private storeService: StoreService,
    private staffService: StaffService,
    private timekeepingStatusService: TimekeepingStatusService,
    private sortService: SortService,
    private identityService: IdentityService,
    private navigationService: NavigationService
  ) {
    this.subSortService = this.sortService.columnSorted$.subscribe(colName => {
      this.sort(colName);
    });
    this.isAdmin = this.identityService.isAdmin();
  }

  ngOnInit() {
    this.findList();
    this.subListStatus = this.timekeepingStatusService.findAll()
      .subscribe(response => {
        this.listStatus = response;
      });
    this.subListStaff = this.staffService.findAll()
      .subscribe(response => {
        this.listStaff = response;
      });
    this.subListStore = this.storeService.findAll()
      .subscribe(response => {
        this.listStore = response;
      })
  }

  ngOnDestroy(): void {
    if (this.subListTimekeeping)
      this.subListTimekeeping.unsubscribe();
    if (this.subSortService)
      this.subSortService.unsubscribe();
    if (this.subListStatus)
      this.subListStatus.unsubscribe();
    if (this.subListStaff)
      this.subListStaff.unsubscribe();
    if (this.subListStore)
      this.subListStore.unsubscribe();
  }

  onFilter() {
    this.params.page = 0;
    this.findList();
  }

  findList() {
    this.subListTimekeeping = this.timekeepingService.findList(this.params)
      .subscribe(response => {
        this.error.isError = false;
        this.listTimekeeping = response.content;
        if (this.listTimekeeping.length === 0) {
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
    this.listTimekeeping.sort(sortByProperty(property, this.sortDirection));
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

  onDetail(id) {

  }

  navTimekeepingCreate() {
    this.navigationService.navTimekeepingCreate();
  }

}
