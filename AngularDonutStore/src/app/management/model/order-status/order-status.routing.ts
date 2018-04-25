import { OrderStatusListComponent } from './page/order-status-list/order-status-list.component';
import { OrderStatusComponent } from './order-status.component';
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path: '',
    component: OrderStatusComponent,
    children: [
      { path: '', component: OrderStatusListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderStatusRoutingModule { }