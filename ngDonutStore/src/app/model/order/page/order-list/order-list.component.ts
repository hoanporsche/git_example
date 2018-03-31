import { User } from './../../../user/user';
import { OrderStatus } from './../../../order-status/order-status';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../../order';
import { Store } from '../../../store/store';
import { Subscription } from 'rxjs/Subscription';
import { CONFIG } from '../../../../shared/constants/configuration.constant';
import { OrderService } from '../../service/order.service';
import { StoreService } from '../../../store/service/store.service';
import { OrderStatusService } from '../../../order-status/service/order-status.service';
import { SortService } from '../../../../core/services/sort.service';
import { sortByProperty } from '../../../../shared/helpers/data.helper';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {

  currentUser: User;

  listOrder: Order[];
  listStore: Store[];
  listOrderStatus: OrderStatus[];

  private subListOrder: Subscription;
  private subListStore: Subscription;
  private subListOrderStatus: Subscription;
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
    statusId: '',
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
    private orderService: OrderService,
    private storeService: StoreService,
    private orderStatusService: OrderStatusService,
    private sortService: SortService
  ) {
    this.subSortService = this.sortService.columnSorted$.subscribe(colName => {
      this.sort(colName);
    });
  }

  ngOnInit() {
    this.findList();
    this.subListOrderStatus = this.orderStatusService.findAll()
      .subscribe(response => {
        this.listOrderStatus = response;
      });
    this.subListStore = this.storeService.findAll()
      .subscribe(response => {
        this.listStore = response;
      });
  }

  ngOnDestroy(): void {
    if (this.subListOrderStatus)
      this.subListOrderStatus.unsubscribe();
    if (this.subListStore)
      this.subListStore.unsubscribe();
    if (this.subListOrder)
      this.subListOrder.unsubscribe();
    if (this.subSortService)
      this.subSortService.unsubscribe();
  }

  onFilter() {
    this.params.page = 0;
    this.findList();
  }

  findList() {
    this.subListOrder = this.orderService.findList(this.params)
      .subscribe(response => {
        this.error.isError = false;
        this.listOrder = response.content;
        console.log(this.listOrder)
        if (this.listOrder.length === 0) {
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
    this.listOrder.sort(sortByProperty(property, this.sortDirection));
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

  onDetail(order) {
    console.log(order);
  }

}
