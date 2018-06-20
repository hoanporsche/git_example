import { ChatFreeService } from './../../../core/services/chat-free.service';
import { WebSocketService } from './../../../core/services/web-socket.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input() currentUser;
  isOpen = false;
  stompClient;
  allReceivedMessages = [];

  private chatUrl = environment.baseUrl + '/chat';

  private appChatRoomUrl = '/app/chat/room/';
  private roomChatUrl = '/topic/room/';
  private roomName: string;

  private subCreateRoom: Subscription;
  private subChatRoom: Subscription;

  constructor(
    private wsService: WebSocketService,
    private chatService: ChatFreeService,
  ) { }

  ngOnInit() {
  }

  emitAction(event) {
    if (event === 'byFb') {
      console.log(event === 'byFb');
    } else {
      this.currentUser = event;
      this.subCreateRoom = this.chatService.createRoom(event)
        .subscribe(response => {
          this.roomName = response.name
          this.connect();
        });
    }
  }
  emitMessage(event) {
    this.sendMessage(event);
  }

  reset() {
    this.currentUser = undefined;
  }

  connect() {
    this.stompClient = this.wsService.connect(this.chatUrl);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(this.roomChatUrl + this.roomName, messageOutput => {
        this.allReceivedMessages.push(JSON.parse(messageOutput.body));
      })
    });
  }

  sendMessage(message) {
    this.stompClient.send(this.appChatRoomUrl + this.roomName, {}, JSON.stringify({
      senderDb: this.currentUser,
      text: message
    }));
  }

  openBox() {
    this.isOpen = true;
  }
  closeBox() {
    this.isOpen = false;
    this.currentUser = undefined;
    if (this.stompClient)
      this.stompClient.disconnect();
  }

  ngOnDestroy() {
    if (this.stompClient)
      this.stompClient.disconnect();
  }
}
