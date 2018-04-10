import { MainService } from './service-main/main-service.service';
import { LayoutMainRoutingModule } from './layout-main.routing';
import { FooterMainComponent } from './footer-main/footer-main.component';
import { HeaderMainComponent } from './header-main/header-main.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutMainComponent } from './layout-main.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LayoutMainRoutingModule
  ],
  declarations: [
    LayoutMainComponent,
    HeaderMainComponent,
    FooterMainComponent
  ],
  providers: [
    MainService
  ]
})
export class LayoutMainModule { }
