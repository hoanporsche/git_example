import { Component, OnInit, OnDestroy } from '@angular/core';
import { Supply } from '../../supply';
import { CONFIG } from '../../../../shared/constants/configuration.constant';
import { Subscription } from 'rxjs/Subscription';
import { SupplyService } from '../../service/supply.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SortService } from '../../../../core/services/sort.service';
import { sortByProperty } from '../../../../shared/helpers/data.helper';

declare var $:any;
@Component({
  selector: 'app-supply-list',
  templateUrl: './supply-list.component.html',
  styleUrls: ['./supply-list.component.css']
})
export class SupplyListComponent implements OnInit, OnDestroy {

  listSupply: Supply[];
  oldSupply: Supply;

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

  private subListSupply: Subscription;
  private subSortService: Subscription;
  private subSupply: Subscription;

  constructor(private supplyService: SupplyService,
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
    if (this.subListSupply)
      this.subListSupply.unsubscribe();
    if (this.subSortService)
      this.subSortService.unsubscribe();
    if (this.subSupply)
      this.subSupply.unsubscribe();
  }

  findList() {
    this.subListSupply = this.supplyService.findList(this.params)
      .subscribe(response => {
        this.error.isError = false;
        this.listSupply = response.content;
        if (this.listSupply.length === 0) {
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
    this.listSupply.sort(sortByProperty(property, this.sortDirection));
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

  supplySubmitted(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_add').modal('toggle');
    }
  }

  supplyUpdated(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_update').modal('toggle');
    }
  }

  onDetail(supply) {
    this.oldSupply = supply;
    this.supplyService.setSupply(JSON.parse(JSON.stringify(supply)));
    $('#modal_update').appendTo("body").modal('show');
  }

  onEnabledOrNot(id) {
    this.subSupply = this.supplyService.enabledOrNot({ id: id })
      .subscribe(response => {
        this.error.isError = false;
        this.findList();
      }, error => {
        this.error.isError = true;
        this.error.message = error.error;
      })
  }

}
