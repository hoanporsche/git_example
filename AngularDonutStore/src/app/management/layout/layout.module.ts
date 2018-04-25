import { StaffGuard } from './../../shared/guards/staff.guard';
import { AdminGuard } from './../../shared/guards/admin.guard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { UserModule } from '../model/user/user.module';
import { SharedModule } from '../../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout.routing';
import { StoreGuard } from '../../shared/guards/store.guard';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    UserModule,
  ],
  declarations: [
    LayoutComponent,
    AsideNavComponent,
    FooterComponent,
    HeaderComponent, 
    ScrollTopComponent,
  ],
  providers: [
    AdminGuard,
    StoreGuard,
    StaffGuard
  ]
})
export class LayoutModule { }
