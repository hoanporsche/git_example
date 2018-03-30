import { QuantityComponent } from './quantity.component';
import { QuantityService } from './service/quantity.service';
import { SharedModule } from './../../shared/shared.module';
import { QuantityRoutingModule } from './quantity.routing';
import { NgModule } from '@angular/core';
import { QuantityCreateComponent } from './page/quantity-create/quantity-create.component';
import { QuantityDetailComponent } from './page/quantity-detail/quantity-detail.component';
import { QuantityListComponent } from './page/quantity-list/quantity-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '../store/store.module';
import { ItemModule } from '../item/item.module';

@NgModule({
  imports: [
    QuantityRoutingModule,
    SharedModule,
    NgbModule,
    StoreModule,
    ItemModule
  ],
  declarations: [
    QuantityComponent,
    QuantityCreateComponent, 
    QuantityDetailComponent, 
    QuantityListComponent
  ],
  providers: [
    QuantityService
  ]
})
export class QuantityModule { }
