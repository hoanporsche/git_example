import { CHAT_URL } from './../../constants/api.constant';
import { ChatFreeService } from './../../../core/services/chat-free.service';
import { WebSocketService } from './../../../core/services/web-socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { LOCAL_STORAGE } from '../../constants/local-storage.constant';

declare var $: any;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  chatUser: ChatUser;
  isOpen = false;
  stompClient;
  allReceivedMessages = [];

  private chatUrl = environment.baseUrl + CHAT_URL.CHAT;
  private appChatRoomUrl = CHAT_URL.APP_CHAT_ROOM;
  private topicRoomUrl = CHAT_URL.TOPIC_ROOM;
  private roomName: string;

  private subCreateRoom: Subscription;
  private subChatRoom: Subscription;

  constructor(
    private wsService: WebSocketService,
    private chatService: ChatFreeService,
  ) { }

  ngOnInit() {
    this.chatUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CHAT_USER));
    if (this.chatUser) {
      this.roomName = this.chatUser.roomName;
      this.connect();
    }
  }

  getEmitChatUser(event) {
    if (event === 'byFb') {
      console.log(event === 'byFb');
    } else {
      this.subCreateRoom = this.chatService.createRoom(event)
        .subscribe(response => {
          this.roomName = response.name;
          this.chatUser = event;
          this.chatUser.roomName = this.roomName;
          localStorage.setItem(LOCAL_STORAGE.CHAT_USER, JSON.stringify(this.chatUser));
          this.connect();
        });
    }
  }
  emitMessage(event) {
    this.sendMessage(event);
  }

  private connect() {
    this.stompClient = this.wsService.createStomp(this.chatUrl);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(this.topicRoomUrl + this.roomName, messageOutput => {
        this.allReceivedMessages.push(JSON.parse(messageOutput.body));
      })
    });
  }

  sendMessage(message) {
    this.stompClient.send(this.appChatRoomUrl + this.roomName, {}, JSON.stringify({
      senderDb: this.chatUser,
      text: message
    }));
  }

  openBox() {
    this.isOpen = true;
  }
  closeBox() {
    this.isOpen = false;
    this.chatUser = undefined;
    if (this.stompClient)
      this.stompClient.disconnect();
  }

  ngOnDestroy() {
    if (this.stompClient)
      this.stompClient.disconnect();
  }
}
export interface ChatUser {
  name?: string,
  phone?: string,
  roomName?: string,
}  