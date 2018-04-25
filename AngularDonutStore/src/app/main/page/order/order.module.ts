import { OrderComponent } from './order.component';
import { NgModule } from '@angular/core';
import { OrderCreateComponent } from './component/order-create/order-create.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { OrderRoutingModule } from './order.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from './service/order.service';
import { SharedModule } from '../../../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    OrderRoutingModule,
    NgbModule,
    SharedModule,
    AgmCoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    OrderComponent,
    OrderCreateComponent, 
    OrderDetailComponent
  ],
  providers: [
    OrderService
  ]
})
export class OrderModule { }
