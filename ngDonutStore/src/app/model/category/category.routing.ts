import { CategoryListComponent } from './page/category-list/category-list.component';
import { Routes, RouterModule } from "@angular/router";
import { CategoryComponent } from "./category.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { 
    path: '',
    component: CategoryComponent,
    children: [
      { path: '', component: CategoryListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }