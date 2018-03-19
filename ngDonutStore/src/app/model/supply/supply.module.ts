import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplyCreateComponent } from './page/supply-create/supply-create.component';
import { SupplyDetailComponent } from './page/supply-detail/supply-detail.component';
import { SupplyListComponent } from './page/supply-list/supply-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SupplyCreateComponent, SupplyDetailComponent, SupplyListComponent]
})
export class SupplyModule { }
