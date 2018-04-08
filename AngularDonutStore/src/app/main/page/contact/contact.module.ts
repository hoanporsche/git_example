import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactRoutingModule } from './contact.routing';
import { ContactService } from './service/contact.service';
import { NgModule } from '@angular/core';
import { ContactMainComponent } from './component/contact-main/contact-main.component';
import { ContactComponent } from './contact.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ContactRoutingModule,
    NgbModule
  ],
  declarations: [
    ContactComponent,
    ContactMainComponent
  ],
  providers: [
    ContactService
  ]
})
export class ContactModule { }
