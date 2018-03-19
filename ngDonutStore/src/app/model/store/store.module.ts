import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCreateComponent } from './page/store-create/store-create.component';
import { StoreDetailComponent } from './page/store-detail/store-detail.component';
import { StoreListComponent } from './page/store-list/store-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StoreCreateComponent, StoreDetailComponent, StoreListComponent]
})
export class StoreModule { }
