import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

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
  
  constructor() { }

  ngOnInit() {
  }

}
