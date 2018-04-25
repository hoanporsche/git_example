import { OrderDetailComponent } from './page/order-detail/order-detail.component';
import { OrderCreateComponent } from './page/order-create/order-create.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { Routes, RouterModule } from "@angular/router";
import { OrderComponent } from "./order.component";
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path: '',
    component: OrderComponent,
    children: [
      { path: 'detail', component: OrderDetailComponent},
      { path: 'create', component: OrderCreateComponent},
      { path: '', component: OrderListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }