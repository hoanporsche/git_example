import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { UserJson } from '../../../../management/model/user/user-json';
import { WebSocketService } from '../../../../core/services/web-socket.service';
import { ChatInternalService } from '../../../../core/services/chat-internal.service';
import { environment } from '../../../../../environments/environment';
import { CHAT_URL } from '../../../constants/api.constant';
import { Subscription } from 'rxjs/Subscription';
import { CONFIG } from '../../../constants/configuration.constant';

@Component({
  selector: 'app-form-chat-internal',
  templateUrl: './form-chat-internal.component.html',
  styleUrls: ['./form-chat-internal.component.css']
})
export class FormChatInternalComponent implements OnInit, OnDestroy {

  private chatUrl = environment.baseUrl + CHAT_URL.CHAT;
  private topicRoomUrl = CHAT_URL.TOPIC_ROOM;

  roomName;
  @Input() sender;
  @Input() currentUser: UserJson;
  message = '';
  allReceivedMessages= [];
  stompClient;

  private subFindAllMessage: Subscription;
  private subSendMessage: Subscription;

  params = {
    senderPhone: '',
    page: 0,
    size: CONFIG.PAGE_SIZE,
    sort: 'id,desc'
  }

  constructor(
    private chatInternalService: ChatInternalService,
    private wsService: WebSocketService,  
  ) { 
    this.stompClient = this.wsService.createStomp(this.chatUrl);
  }

  ngOnInit() {
    this.findListMessage();
  }

  private connect() {
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(this.topicRoomUrl + this.roomName, message => {
        console.log(message);
        //push new noti on the top
        // this.allReceivedMessages.push(message);
      });
    });
  }

  private findListMessage() {
    this.params.senderPhone = this.sender.phone;
    this.subFindAllMessage = this.chatInternalService.findAll(this.params)
      .subscribe(response => {
        this.allReceivedMessages = response.content;
        this.allReceivedMessages.reverse();
        this.roomName = this.allReceivedMessages[0].roomDbId.name;
        this.connect();
      }, error => {

      });
  }

  sendMessage() {
    this.subSendMessage = this.chatInternalService.sendMessage(this.roomName, this.message.trim())
      .subscribe(response => {
        this.message = '';
      }, error => {

      })
  }

  ngOnDestroy() {
    if (this.subSendMessage)
      this.subSendMessage.unsubscribe();
    if (this.subFindAllMessage)
      this.subFindAllMessage.unsubscribe();
  }
}
