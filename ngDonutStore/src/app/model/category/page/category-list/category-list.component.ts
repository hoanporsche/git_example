import { Subscription } from 'rxjs/Subscription';
import { CategoryService } from './../../service/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../category';
import { CONFIG } from '../../../../shared/constants/configuration.constant';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  listCategory: Category[];

  requestPage;
  notFoundMessage = '';
  error = {
    isError: false,
    message: ''
  };

  sortDirection = 0;
  currentSortProperty = '';

  private params = {
    page: 0,
    size: CONFIG.PAGE_SIZE,
    sort: 'id,desc'
  }

  private subListCategory: Subscription;

  constructor(private categoryService: CategoryService) {
    this.listCategory = [];
  }

  ngOnInit() {
    this.findList();
  }

  ngOnDestroy(): void {
    if (this.subListCategory)
      this.subListCategory.unsubscribe();
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
}
