import { SupplyComponent } from './supply.component';
import { SupplyListComponent } from './page/supply-list/supply-list.component';
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path: '',
    component: SupplyComponent,
    children: [
      { path: '', component: SupplyListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplyRoutingModule { }