import { Routes, RouterModule } from "@angular/router";
import { StoreComponent } from "./store.component";
import { StoreListComponent } from "./page/store-list/store-list.component";
import { NgModule } from "@angular/core";
import { StoreCreateComponent } from "./page/store-create/store-create.component";
import { StoreDetailComponent } from "./page/store-detail/store-detail.component";

const routes: Routes = [
  { 
    path: '',
    component: StoreComponent,
    children: [
      { path: 'detail', component: StoreDetailComponent},
      { path: 'create', component: StoreCreateComponent},
      { path: '', component: StoreListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }