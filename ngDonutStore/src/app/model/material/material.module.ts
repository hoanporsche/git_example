import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCreateComponent } from './page/material-create/material-create.component';
import { MaterialDetailComponent } from './page/material-detail/material-detail.component';
import { MaterialListComponent } from './page/material-list/material-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MaterialCreateComponent, MaterialDetailComponent, MaterialListComponent]
})
export class MaterialModule { }
