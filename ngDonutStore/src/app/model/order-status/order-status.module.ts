import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusCreateComponent } from './page/order-status-create/order-status-create.component';
import { OrderStatusDetaiComponent } from './page/order-status-detai/order-status-detai.component';
import { OrderStatusListComponent } from './page/order-status-list/order-status-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OrderStatusCreateComponent, 
    OrderStatusDetaiComponent, 
    OrderStatusListComponent
  ]
})
export class OrderStatusModule { }
