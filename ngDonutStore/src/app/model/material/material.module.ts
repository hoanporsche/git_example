import { SupplyModule } from './../supply/supply.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialComponent } from './material.component';
import { SharedModule } from './../../shared/shared.module';
import { MaterialRoutingModule } from './material.routing';
import { NgModule } from '@angular/core';
import { MaterialCreateComponent } from './page/material-create/material-create.component';
import { MaterialDetailComponent } from './page/material-detail/material-detail.component';
import { MaterialListComponent } from './page/material-list/material-list.component';
import { MaterialService } from './service/material.service';

@NgModule({
  imports: [
    MaterialRoutingModule,
    SharedModule,
    NgbModule,
    SupplyModule
  ],
  declarations: [
    MaterialComponent,
    MaterialCreateComponent, 
    MaterialDetailComponent, 
    MaterialListComponent
  ],
  providers: [
    MaterialService,
  ]
})
export class MaterialModule { }