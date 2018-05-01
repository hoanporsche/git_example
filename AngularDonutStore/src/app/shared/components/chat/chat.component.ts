import { WebSocketService } from './../../../core/services/web-socket.service';
import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../../core/services/chat.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonValidator } from '../../custom-validator/common.validator';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() currentUser;
  formCurrentUser: FormGroup;
  messages;
  constructor(
    private chatService: ChatService,
    private fb: FormBuilder,
  ) {
    this.formCurrentUser = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty], []],
      phone: ['', [Validators.required, CommonValidator.notEmpty], []],
      email: ['', [Validators.required, CommonValidator.notEmpty], []],
    })
  }

  ngOnInit() {
    // if (!this.currentUser) {
    //   this.currentUser = { userName: 'unknow' }
    // }
  }

  setCurrentUser() {
    this.currentUser = {
      name: this.name.value,
      phone: this.phone.value,
      email: this.email.value,
    }
  }
  connect() {
    this.messages = this.chatService.connect();
  }

  disconnect() {
    this.chatService.disconnect();
  }

  sendMessage(message) {
    const messageInput = {
      from: this.currentUser,
      text: message
    }
    this.chatService.sendMessage(messageInput);
  }

  get name() {
    return this.formCurrentUser.get('name');
  }

  get phone() {
    return this.formCurrentUser.get('phone');
  }

  get email() {
    return this.formCurrentUser.get('email');
  }
}
