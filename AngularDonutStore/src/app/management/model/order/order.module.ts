import { OrderStatusModule } from './../order-status/order-status.module';
import { StoreModule } from './../store/store.module';
import { OrderService } from './service/order.service';
import { SharedModule } from './../../../shared/shared.module';
import { OrderRoutingModule } from './order.routing';
import { NgModule } from '@angular/core';
import { OrderCreateComponent } from './page/order-create/order-create.component';
import { OrderDetailComponent } from './page/order-detail/order-detail.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { OrderComponent } from './order.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    OrderRoutingModule,
    SharedModule,
    NgbModule,
    StoreModule,
    OrderStatusModule,
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
