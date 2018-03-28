import { MaterialService } from './../../../material/service/material.service';
import { Material } from './../../../material/material';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CONFIG } from '../../../../shared/constants/configuration.constant';
import { Item } from '../../item';
import { Subscription } from 'rxjs/Subscription';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SortService } from '../../../../core/services/sort.service';
import { ItemService } from '../../service/item.service';
import { sortByProperty } from '../../../../shared/helpers/data.helper';
import { Category } from '../../../category/category';
import { CategoryService } from '../../../category/service/category.service';

declare var $: any;
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {

  listItem: Item[];
  oldItem: Item;
  listCategory: Category[];
  listMaterial: Material[];

  requestPage;
  notFoundMessage = '';
  error = {
    isError: false,
    message: ''
  };

  sortDirection = 0;
  currentSortProperty = '';

  private params = {
    enabled: '',
    page: 0,
    size: CONFIG.PAGE_SIZE,
    sort: 'id,desc'
  }
  enabled = [
    { view: 'true' },
    { view: 'false' }
  ]

  private subListItem: Subscription;
  private subSortService: Subscription;
  private subItem: Subscription;
  private subListCategory: Subscription;
  private subListMaterial: Subscription;

  constructor(private itemService: ItemService,
    private categoryService: CategoryService,
    private materialService: MaterialService,
    private navigationService: NavigationService,
    private sortService: SortService
  ) {
    this.subSortService = this.sortService.columnSorted$.subscribe(colName => {
      this.sort(colName);
    });
  }

  ngOnInit() {
    this.findList();
    this.subListCategory = this.categoryService.findAll()
      .subscribe(response => {
        this.listCategory = response;
      });
    this.subListMaterial = this.materialService.findAll()
      .subscribe(response => {
        this.listMaterial = response;
      })
  }

  ngOnDestroy(): void {
    if (this.subListItem)
      this.subListItem.unsubscribe();
    if (this.subSortService)
      this.subSortService.unsubscribe();
    if (this.subItem)
      this.subItem.unsubscribe();
    if (this.subListCategory)
      this.subListCategory.unsubscribe();
    if (this.subListMaterial)
      this.subListMaterial.unsubscribe();
  }

  findList() {
    this.subListItem = this.itemService.findList(this.params)
      .subscribe(response => {
        this.error.isError = false;
        this.listItem = response.content;
        console.log(this.listItem)
        if (this.listItem.length === 0) {
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
    this.listItem.sort(sortByProperty(property, this.sortDirection));
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

  itemSubmitted(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_add').modal('toggle');
    }
  }

  itemUpdated(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_update').modal('toggle');
    }
  }

  onDetail(item) {
    this.oldItem = item;
    this.itemService.setItem(JSON.parse(JSON.stringify(item)));
    $('#modal_update').appendTo("body").modal('show');
  }

  onEnabledOrNot(id) {
    this.subItem = this.itemService.enabledOrNot({ id: id })
      .subscribe(response => {
        this.error.isError = false;
        this.findList();
      }, (error: Error) => {
        this.error.isError = true;
        this.error.message = error.message;
      })
  }
}
