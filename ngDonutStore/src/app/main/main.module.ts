import { MainComponent } from './main.component';
import { MainService } from './service/main.service';
import { MainRoutingModule } from './main.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './page/contact/contact.component';
import { DetailComponent } from './page/detail/detail.component';
import { LoginModalComponent } from './page/login-modal/login-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    NgbModule,
  ],
  declarations: [
    HomeComponent,
    MainComponent,
    ContactComponent,
    DetailComponent,
    LoginModalComponent,
  ],
  providers: [MainService]
})
export class MainModule { }
