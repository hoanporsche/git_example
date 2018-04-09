import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { LayoutRoutingModule } from './layout-main.routing';
import { HeaderComponent } from './header/header.component';
import { LayoutMainComponent } from './layout-main.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LayoutRoutingModule
  ],
  declarations: [
    LayoutMainComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class LayoutMainModule { }
