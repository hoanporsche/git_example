import { SharedModule } from './../../shared/shared.module';
import { StoreRoutingModule } from './store.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCreateComponent } from './page/store-create/store-create.component';
import { StoreDetailComponent } from './page/store-detail/store-detail.component';
import { StoreListComponent } from './page/store-list/store-list.component';
import { StoreService } from './service/store.service';
import { StoreComponent } from './store.component';

@NgModule({
  imports: [
    CommonModule,
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
