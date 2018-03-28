import { Subscription } from 'rxjs/Subscription';
import { CategoryService } from './../../service/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../category';
import { CONFIG } from '../../../../shared/constants/configuration.constant';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SortService } from '../../../../core/services/sort.service';
import { sortByProperty } from '../../../../shared/helpers/data.helper';

declare var $: any;
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  listCategory: Category[];
  oldCategory: Category;

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

  private subListCategory: Subscription;
  private subSortService: Subscription;
  private subCategory: Subscription;

  constructor(private categoryService: CategoryService,
    private navigationService: NavigationService,
    private sortService: SortService
  ) {
    this.listCategory = [];
    this.subSortService = this.sortService.columnSorted$.subscribe(colName => {
      this.sort(colName);
    });
  }

  ngOnInit() {
    this.findList();
  }

  ngOnDestroy(): void {
    if (this.subListCategory)
      this.subListCategory.unsubscribe();
    if (this.subSortService)
      this.subSortService.unsubscribe();
    if (this.subCategory)
      this.subCategory.unsubscribe();
  }

  findList() {
    this.subListCategory = this.categoryService.findList(this.params)
      .subscribe(response => {
        this.error.isError = false;
        this.listCategory = response.content;
        if (this.listCategory.length === 0){
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
    this.listCategory.sort(sortByProperty(property, this.sortDirection));
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
    $('#modal_add').appendTo("body").modal({show: true, backdrop: 'static'});
  }

  categorySubmitted(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_add').modal('toggle');
    }
  }

  categoryUpdated(event) {
    if (event === 'success') {
      this.params.page = 0;
      // reload request list
      this.findList();
      // close modal
      $('#modal_update').modal('toggle');
    }
  }

  onDetail(category) {
    this.oldCategory = category;
    this.categoryService.setCategory(JSON.parse(JSON.stringify(category)));
    $('#modal_update').appendTo("body").modal('show');  
  }

  onEnabledOrNot(id) {
    this.subCategory = this.categoryService.enabledOrNot({id: id})
      .subscribe(response => {
        this.error.isError = false;
        this.findList();
      },(error: Error) => {
        this.error.isError = true;
        this.error.message = error.message;
      })
  }
}
