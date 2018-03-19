import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCreateComponent } from './page/order-create/order-create.component';
import { OrderDetailComponent } from './page/order-detail/order-detail.component';
import { OrderListComponent } from './page/order-list/order-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrderCreateComponent, OrderDetailComponent, OrderListComponent]
})
export class OrderModule { }
