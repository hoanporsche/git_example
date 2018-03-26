import { OrderService } from './service/order.service';
import { SharedModule } from './../../shared/shared.module';
import { OrderRoutingModule } from './order.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCreateComponent } from './page/order-create/order-create.component';
import { OrderDetailComponent } from './page/order-detail/order-detail.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { OrderComponent } from './order.component';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
  ],
  declarations: [
    OrderComponent,
    OrderCreateComponent, 
    OrderDetailComponent, 
    OrderListComponent
  ],
  providers: [
    OrderService
  ]
})
export class OrderModule { }
