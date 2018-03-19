import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityCreateComponent } from './page/quantity-create/quantity-create.component';
import { QuantityDetailComponent } from './page/quantity-detail/quantity-detail.component';
import { QuantityListComponent } from './page/quantity-list/quantity-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [QuantityCreateComponent, QuantityDetailComponent, QuantityListComponent]
})
export class QuantityModule { }
