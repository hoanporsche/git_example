import { SharedModule } from './../../../shared/shared.module';
import { CategoryRoutingModule } from './category.routing';
import { CategoryService } from './service/category.service';
import { NgModule } from '@angular/core';
import { CategoryCreateComponent } from './page/category-create/category-create.component';
import { CategoryDetailComponent } from './page/category-detail/category-detail.component';
import { CategoryListComponent } from './page/category-list/category-list.component';
import { CategoryComponent } from './category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CategoryRoutingModule,
    SharedModule,
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
