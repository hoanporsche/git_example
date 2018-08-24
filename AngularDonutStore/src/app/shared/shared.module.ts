import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryPipe } from './pipes/summary.pipe';
import { SortableColumnComponent } from './components/sortable-column/sortable-column.component';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HrefPreventDefaultDirective } from './directives/href-prevent-default.directive';
import { AgmDirectionModule } from 'agm-direction';
import { ChatComponent } from './components/chat/chat.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';
import { ChatInternalComponent } from './components/chat-internal/chat-internal.component';
import { FormUserComponent } from './components/chat/form-user/form-user.component';
import { FormChatComponent } from './components/chat/form-chat/form-chat.component';
import { AllSenderComponent } from './components/chat-internal/all-sender/all-sender.component';
import { FormChatInternalComponent } from './components/chat-internal/form-chat-internal/form-chat-internal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmDirectionModule,
  ],
  declarations: [
    SummaryPipe,
    SortableColumnComponent,
    HrefPreventDefaultDirective,
    OnlyNumberDirective,
    ChatComponent,
    FormUserComponent,
    FormChatComponent,
    NotificationComponent,
    ElapsedTimePipe,
    InfiniteScrollDirective,
    ChatInternalComponent,
    AllSenderComponent,
    FormChatInternalComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HrefPreventDefaultDirective,
    SummaryPipe,
    SortableColumnComponent,
    OnlyNumberDirective,
    AgmDirectionModule,
    ChatComponent,
    NotificationComponent,
    ElapsedTimePipe,
    InfiniteScrollDirective,
    ChatInternalComponent,
  ]
})
export class SharedModule { }
