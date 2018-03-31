import { Item } from './../../../item/item';
import { ItemService } from './../../../item/service/item.service';
import { StoreService } from './../../../store/service/store.service';
import { QuantityService } from './../../service/quantity.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from './../../../store/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Quantity } from '../../quantity';
import { CONFIG } from '../../../../shared/constants/configuration.constant';
import { SortService } from '../../../../core/services/sort.service';
import { sortByProperty } from '../../../../shared/helpers/data.helper';

@Component({
  selector: 'app-quantity-list',
  templateUrl: './quantity-list.component.html',
  styleUrls: ['./quantity-list.component.css']
})
export class QuantityListComponent implements OnInit, OnDestroy {

  listQuantity: Quantity[];
  listStore: Store[];
  listItem: Item[];

  private subListQuantity: Subscription;
  private subListStore: Subscription;
  private subListItem: Subscription;
  private subSortService: Subscription;

  requestPage;
  notFoundMessage = '';
  error = {
    isError: false,
    message: ''
  };

  sortDirection = 0;
  currentSortProperty = '';

  params = {
    storeId: '',
    itemId: '',
    startDate: '',
    endDate: '',
    isShipping: '',
    page: 0,
    size: CONFIG.PAGE_SIZE,
    sort: 'id,desc'
  }
  shipping = [
    { view: 'Yes', value: 'true' },
    { view: 'No', value: 'false' }
  ]

  constructor(
    private quantityService: QuantityService,
    private storeService: StoreService,
    private itemService: ItemService,
    private sortService: SortService
  ) {
    this.subSortService = this.sortService.columnSorted$.subscribe(colName => {
      this.sort(colName);
    });
  }

  ngOnInit() {
    this.findList();
    this.subListItem = this.itemService.findAll()
      .subscribe(response => {
        this.listItem = response;
      });
    this.subListStore = this.storeService.findAll()
      .subscribe(response => {
        this.listStore = response;
      });
  }

  ngOnDestroy(): void {
    if (this.subListItem)
      this.subListItem.unsubscribe();
    if (this.subListStore)
      this.subListStore.unsubscribe();
    if (this.subListQuantity)
      this.subListQuantity.unsubscribe();
    if (this.subSortService)
      this.subSortService.unsubscribe();
  }

  onFilter() {
    this.params.page = 0;
    this.findList();
  }

  findList() {
    this.subListQuantity = this.quantityService.findList(this.params)
      .subscribe(response => {
        this.error.isError = false;
        this.listQuantity = response.content;
        if (this.listQuantity.length === 0) {
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
    this.listQuantity.sort(sortByProperty(property, this.sortDirection));
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

}
