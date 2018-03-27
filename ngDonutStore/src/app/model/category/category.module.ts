import { CoreModule } from './../../core/core.module';
import { SharedModule } from './../../shared/shared.module';
import { CategoryRoutingModule } from './category.routing';
import { CategoryService } from './service/category.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCreateComponent } from './page/category-create/category-create.component';
import { CategoryDetailComponent } from './page/category-detail/category-detail.component';
import { CategoryListComponent } from './page/category-list/category-list.component';
import { CategoryComponent } from './category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    CoreModule,
    NgbModule
  ],
  declarations: [
    CategoryComponent,
    CategoryCreateComponent, 
    CategoryDetailComponent, 
    CategoryListComponent
  ],
  providers: [
    CategoryService
  ]
})
export class CategoryModule { }
