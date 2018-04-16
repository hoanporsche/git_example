import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryPipe } from './pipes/summary.pipe';
import { SortableColumnComponent } from './components/sortable-column/sortable-column.component';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HrefPreventDefaultDirective } from './directives/href-prevent-default.directive';
import { AgmDirectionModule } from 'agm-direction'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmDirectionModule
  ],
  declarations: [
    SummaryPipe,
    SortableColumnComponent,
    HrefPreventDefaultDirective,
    // JobTitleDirective,
    // NameDirective,
    // PhoneNumberDirective,
    OnlyNumberDirective,
    // LetterNumberOnlyDirective,
    // UsernameDirective,
    // EmailDirective,
    // RolePipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HrefPreventDefaultDirective,
    // UnwrapTagDirective,
    SummaryPipe,
    SortableColumnComponent,
    // JobTitleDirective,
    // NameDirective,
    // PhoneNumberDirective,
    OnlyNumberDirective,
    // LetterNumberOnlyDirective,
    // UsernameDirective,
    // EmailDirective,
    // RolePipe,
    AgmDirectionModule
  ]
})
export class SharedModule { }
