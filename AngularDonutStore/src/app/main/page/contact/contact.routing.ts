import { Routes, RouterModule } from "@angular/router";
import { ContactComponent } from "./contact.component";
import { ContactMainComponent } from "./component/contact-main/contact-main.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    children: [
      { path: '', component: ContactMainComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }