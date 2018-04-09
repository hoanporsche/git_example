import { HomeRoutingModule } from './home.routing';
import { HomeService } from './service/home.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeMainComponent } from './component/home-main/home-main.component';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    NgbModule,
  ],
  declarations: [
    HomeComponent,
    HomeMainComponent
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
