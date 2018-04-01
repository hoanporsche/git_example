import { SortService } from './services/sort.service';
import { BaseService } from './services/base.service';
import { ScriptLoaderService } from './services/script-loader.service';
import { NavigationService } from './services/navigation.service';
import { IdentityService } from './services/identity.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [

  ],
  providers: [
    BaseService,
    IdentityService,
    NavigationService,
    ScriptLoaderService,
    LocalStorageService,
    SortService
  ]
})
export class CoreModule { }