import { NgModule } from '@angular/core';
import { SupplyCreateComponent } from './page/supply-create/supply-create.component';
import { SupplyDetailComponent } from './page/supply-detail/supply-detail.component';
import { SupplyListComponent } from './page/supply-list/supply-list.component';
import { SupplyRoutingModule } from './supply.routing';
import { SupplyService } from './service/supply.service';
import { SupplyComponent } from './supply.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SupplyRoutingModule,
    SharedModule,
    NgbModule
  ],
  declarations: [
    SupplyComponent,
    SupplyCreateComponent, 
    SupplyDetailComponent, 
    SupplyListComponent
  ],
  providers: [
    SupplyService
  ]
})
export class SupplyModule { }