import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { UserModule } from '../model/user/user.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    UserModule
  ],
  declarations: [
    LayoutComponent,
    AsideNavComponent,
    FooterComponent,
    HeaderComponent, 
    ScrollTopComponent,
  ]
})
export class LayoutModule { }
