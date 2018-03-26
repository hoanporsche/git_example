import { ItemComponent } from './item.component';
import { SharedModule } from './../../shared/shared.module';
import { ItemService } from './service/item.service';
import { ItemRoutingModule } from './item.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCreateComponent } from './page/item-create/item-create.component';
import { ItemDetailComponent } from './page/item-detail/item-detail.component';
import { ItemListComponent } from './page/item-list/item-list.component';

@NgModule({
  imports: [
    CommonModule,
    ItemRoutingModule,
    SharedModule,
  ],
  declarations: [
    ItemComponent,
    ItemCreateComponent, 
    ItemDetailComponent, 
    ItemListComponent
  ],
  providers: [
    ItemService
  ]
})
export class ItemModule { }
