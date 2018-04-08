import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '../../store';
import { CONFIG } from '../../../../../shared/constants/configuration.constant';
import { Subscription } from 'rxjs/Subscription';
import { StoreService } from '../../service/store.service';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { SortService } from '../../../../../core/services/sort.service';
import { sortByProperty } from '../../../../../shared/helpers/data.helper';

declare var $:any;
@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit, OnDestroy {

  listStore: Store[];
  oldStore: Store;

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

  private subListStore: Subscription;
  private subSortService: Subscription;
  private subStore: Subscription;

  constructor(private storeService: StoreService,
    private navigationService: NavigationService,
    private sortService: SortService
  ) {
    this.subSortService = this.sortService.columnSorted$.subscribe(colName => {
      this.sort(colName);
    });
  }

  ngOnInit() {
    this.findList();
  }

  ngOnDestroy(): void {
    if (this.subListStore)
      this.subListStore.unsubscribe();
    if (this.subSortService)
      this.subSortService.unsubscribe();
    if (this.subStore)
      this.subStore.unsubscribe();
  }

  onFilter() {
    this.params.page = 0;
    this.findList();
  }

  findList() {
    this.subListStore = this.storeService.findList(this.params)
      .subscribe(response => {
        this.error.isError = false;
        this.listStore = response.content;
        if (this.listStore.length === 0) {
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
    this.listStore.sort(sortByProperty(property, this.sortDirection));
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
    $('#modal_add_store').modal({ show: true, backdrop: 'static' });
  }

  storeSubmitted(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_add_store').modal('toggle');
    }
  }

  storeUpdated(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_update_store').modal('toggle');
    }
  }

  onDetail(store) {
    this.oldStore = store;
    this.storeService.setStore(JSON.parse(JSON.stringify(store)));
    $('#modal_update_store').modal('show');
  }

  onEnabledOrNot(id) {
    this.subStore = this.storeService.enabledOrNot({ id: id })
      .subscribe(response => {
        this.error.isError = false;
        this.findList();
      }, error => {
        this.error.isError = true;
        this.error.message = error.error;
      })
  }

}
