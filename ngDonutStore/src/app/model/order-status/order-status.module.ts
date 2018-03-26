import { OrderStatusService } from './service/order-status.service';
import { SharedModule } from './../../shared/shared.module';
import { OrderStatusRoutingModule } from './order-status.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusCreateComponent } from './page/order-status-create/order-status-create.component';
import { OrderStatusDetaiComponent } from './page/order-status-detai/order-status-detai.component';
import { OrderStatusListComponent } from './page/order-status-list/order-status-list.component';
import { OrderStatusComponent } from './order-status.component';

@NgModule({
  imports: [
    CommonModule,
    OrderStatusRoutingModule,
    SharedModule,
  ],
  declarations: [
    OrderStatusComponent,
    OrderStatusCreateComponent, 
    OrderStatusDetaiComponent, 
    OrderStatusListComponent
  ],
  providers: [
    OrderStatusService
  ]
})
export class OrderStatusModule { }
