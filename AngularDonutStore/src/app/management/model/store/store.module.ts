import { StoreRoutingModule } from './store.routing';
import { NgModule } from '@angular/core';
import { StoreCreateComponent } from './page/store-create/store-create.component';
import { StoreDetailComponent } from './page/store-detail/store-detail.component';
import { StoreListComponent } from './page/store-list/store-list.component';
import { StoreService } from './service/store.service';
import { StoreComponent } from './store.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    NgbModule,
    StoreRoutingModule,
    SharedModule,
  ],
  declarations: [
    StoreComponent,
    StoreCreateComponent, 
    StoreDetailComponent, 
    StoreListComponent
  ],
  providers: [
    StoreService
  ]
})
export class StoreModule { }
