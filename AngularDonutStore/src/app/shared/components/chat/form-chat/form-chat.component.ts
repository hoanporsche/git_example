import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-form-chat',
  templateUrl: './form-chat.component.html',
  styleUrls: ['./form-chat.component.css']
})
export class FormChatComponent implements OnInit {

  @Output() emitMessage = new EventEmitter<string>();
  message = '';
  @Input() allReceivedMessages= [];
  @Input() chatUser;

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
