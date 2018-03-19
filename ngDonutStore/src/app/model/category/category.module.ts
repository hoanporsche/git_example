import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCreateComponent } from './page/category-create/category-create.component';
import { CategoryDetailComponent } from './page/category-detail/category-detail.component';
import { CategoryListComponent } from './page/category-list/category-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CategoryCreateComponent, CategoryDetailComponent, CategoryListComponent]
})
export class CategoryModule { }
