import { ItemListComponent } from './page/item-list/item-list.component';
import { ItemComponent } from './item.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { 
    path: '',
    component: ItemComponent,
    children: [
      { path: '', component: ItemListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }