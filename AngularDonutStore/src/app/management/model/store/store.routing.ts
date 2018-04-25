import { Routes, RouterModule } from "@angular/router";
import { StoreComponent } from "./store.component";
import { StoreListComponent } from "./page/store-list/store-list.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { 
    path: '',
    component: StoreComponent,
    children: [
      { path: '', component: StoreListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }