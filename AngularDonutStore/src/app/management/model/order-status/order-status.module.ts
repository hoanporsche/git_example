import { OrderStatusService } from './service/order-status.service';
import { SharedModule } from './../../../shared/shared.module';
import { OrderStatusRoutingModule } from './order-status.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusCreateComponent } from './page/order-status-create/order-status-create.component';
import { OrderStatusListComponent } from './page/order-status-list/order-status-list.component';
import { OrderStatusComponent } from './order-status.component';
import { OrderStatusDetailComponent } from './page/order-status-detail/order-status-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    OrderStatusRoutingModule,
    SharedModule,
    NgbModule
  ],
  declarations: [
    OrderStatusComponent,
    OrderStatusCreateComponent, 
    OrderStatusListComponent, 
    OrderStatusDetailComponent
  ],
  providers: [
    OrderStatusService
  ]
})
export class OrderStatusModule { }
