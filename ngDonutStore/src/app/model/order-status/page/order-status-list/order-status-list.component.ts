import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderStatus } from '../../order-status';
import { CONFIG } from '../../../../shared/constants/configuration.constant';
import { Subscription } from 'rxjs/Subscription';
import { OrderStatusService } from '../../service/order-status.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SortService } from '../../../../core/services/sort.service';
import { sortByProperty } from '../../../../shared/helpers/data.helper';

declare var $:any;
@Component({
  selector: 'app-order-status-list',
  templateUrl: './order-status-list.component.html',
  styleUrls: ['./order-status-list.component.css']
})
export class OrderStatusListComponent implements OnInit, OnDestroy {

  listOrderStatus: OrderStatus[];
  oldOrderStatus: OrderStatus;

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

  private subListOrderStatus: Subscription;
  private subSortService: Subscription;
  private subOrderStatus: Subscription;

  constructor(private orderStatusService: OrderStatusService,
    private navigationService: NavigationService,
    private sortService: SortService
  ) {
    this.listOrderStatus = [];
    this.subSortService = this.sortService.columnSorted$.subscribe(colName => {
      this.sort(colName);
    });
  }

  ngOnInit() {
    this.findList();
  }

  ngOnDestroy(): void {
    if (this.subListOrderStatus)
      this.subListOrderStatus.unsubscribe();
    if (this.subSortService)
      this.subSortService.unsubscribe();
    if (this.subOrderStatus)
      this.subOrderStatus.unsubscribe();
  }

  findList() {
    this.subListOrderStatus = this.orderStatusService.findList(this.params)
      .subscribe(response => {
        this.error.isError = false;
        this.listOrderStatus = response.content;
        if (this.listOrderStatus.length === 0) {
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
    this.listOrderStatus.sort(sortByProperty(property, this.sortDirection));
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

  orderStatusSubmitted(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_add').modal('toggle');
    }
  }

  orderStatusUpdated(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_update').modal('toggle');
    }
  }

  onDetail(orderStatus) {
    this.oldOrderStatus = orderStatus;
    this.orderStatusService.setOrderStatus(JSON.parse(JSON.stringify(orderStatus)));
    $('#modal_update').appendTo("body").modal('show');
  }

  onEnabledOrNot(id) {
    this.subOrderStatus = this.orderStatusService.enabledOrNot({ id: id })
      .subscribe(response => {
        this.error.isError = false;
        this.findList();
      }, error => {
        this.error.isError = true;
        this.error.message = error.error;
      })
  }

}
