import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCreateComponent } from './page/item-create/item-create.component';
import { ItemDetailComponent } from './page/item-detail/item-detail.component';
import { ItemListComponent } from './page/item-list/item-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ItemCreateComponent, ItemDetailComponent, ItemListComponent]
})
export class ItemModule { }
