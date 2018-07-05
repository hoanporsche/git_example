import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { UserJson } from '../../../../management/model/user/user-json';

@Component({
  selector: 'app-form-chat-internal',
  templateUrl: './form-chat-internal.component.html',
  styleUrls: ['./form-chat-internal.component.css']
})
export class FormChatInternalComponent implements OnInit {

  @Output() emitMessage = new EventEmitter<string>();
  message = '';
  @Input() allReceivedMessages= [];
  @Input() roomName;
  @Input() senderName;
  @Input() currentUser: UserJson;

  constructor() { 
  }

  ngOnInit() {
  }

  sendMessage() {
    if (this.message.trim() !== '') {
      this.emitMessage.emit(this.message.trim());
    }
    this.message = '';
  }
}
