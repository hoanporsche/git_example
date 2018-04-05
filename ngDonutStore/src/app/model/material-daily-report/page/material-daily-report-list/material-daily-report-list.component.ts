import { NavigationService } from './../../../../core/services/navigation.service';
import { IdentityService } from './../../../../core/services/identity.service';
import { Material } from './../../../material/material';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialDailyReport } from '../../material-daily-report';
import { Store } from '../../../store/store';
import { Subscription } from 'rxjs/Subscription';
import { CONFIG } from '../../../../shared/constants/configuration.constant';
import { MaterialDailyReportService } from '../../service/material-daily-report.service';
import { StoreService } from '../../../store/service/store.service';
import { MaterialService } from '../../../material/service/material.service';
import { SortService } from '../../../../core/services/sort.service';
import { sortByProperty } from '../../../../shared/helpers/data.helper';

@Component({
  selector: 'app-material-daily-report-list',
  templateUrl: './material-daily-report-list.component.html',
  styleUrls: ['./material-daily-report-list.component.css']
})
export class MaterialDailyReportListComponent implements OnInit, OnDestroy {

  listMaterialDailyReport: MaterialDailyReport[];
  listStore: Store[];
  listMaterial: Material[];

  private subListMaterialDailyReport: Subscription;
  private subListStore: Subscription;
  private subListMaterial: Subscription;
  private subSortService: Subscription;

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
    storeName: '',
    materialId: '',
    startDate: '',
    endDate: '',
    page: 0,
    size: CONFIG.PAGE_SIZE,
    sort: 'id,desc'
  }

  constructor(
    private materialDailyReportService: MaterialDailyReportService,
    private storeService: StoreService,
    private itemService: MaterialService,
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
    this.subListMaterial = this.itemService.findAll()
      .subscribe(response => {
        this.listMaterial = response;
      });
    this.subListStore = this.storeService.findAll()
      .subscribe(response => {
        this.listStore = response;
      });
  }

  ngOnDestroy(): void {
    if (this.subListMaterial)
      this.subListMaterial.unsubscribe();
    if (this.subListStore)
      this.subListStore.unsubscribe();
    if (this.subListMaterialDailyReport)
      this.subListMaterialDailyReport.unsubscribe();
    if (this.subSortService)
      this.subSortService.unsubscribe();
  }

  onFilter() {
    this.params.page = 0;
    this.findList();
  }

  findList() {
    this.subListMaterialDailyReport = this.materialDailyReportService.findList(this.params)
      .subscribe(response => {
        this.error.isError = false;
        this.listMaterialDailyReport = response.content;
        if (this.listMaterialDailyReport.length === 0) {
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
    this.listMaterialDailyReport.sort(sortByProperty(property, this.sortDirection));
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

  navMaterialDailyReportCreate() {
    this.navigationService.navMaterialDailyReportCreate();
  }
}
