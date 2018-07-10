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

  @Output() emitComeback = new EventEmitter<any>();
  @Input() sender;
  @Input() currentUser: UserJson;
  roomName;
  private message = '';
  allReceivedMessages = [];
  private stompClient;

  private subFindAllMessage: Subscription;
  private subSendMessage: Subscription;
  private subFindByUsersInRoom: Subscription;

  params = {
    roomName: '',
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
    if (this.stompClient) {
      this.initMessage();
    }
  }

  refresh() {
    this.wsService.closeConnection(this.stompClient);
    this.stompClient.disconnect();
    this.stompClient = this.wsService.createStomp(this.chatUrl);
    this.initMessage();
  }

  private initMessage() {
    this.findRoom((a) => {
      this.params.roomName = a.name;
      this.roomName = a.name;
      this.findListMessage()
    });
  }

  private findRoom(callBackFindMessages) {
    this.subFindByUsersInRoom = this.chatInternalService.findByUsersInRoom({ senderPhone: this.sender.phone })
      .subscribe(response => {
        return callBackFindMessages(response);
      }, error => {
        alert(error.error);
      })
  }

  private connect() {
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(this.topicRoomUrl + this.roomName, message => {
        //push new noti on the top
        this.allReceivedMessages.push(JSON.parse(message.body));
      });
    });
  }

  private findListMessage() {
    this.subFindAllMessage = this.chatInternalService.findAll(this.params)
      .subscribe(response => {
        this.allReceivedMessages = response.content;
        this.allReceivedMessages.reverse();
        this.connect();
      }, error => {

      });
  }

  comeback() {
    this.emitComeback.emit('goback');
  }

  sendMessage() {
    this.subSendMessage = this.chatInternalService.sendMessage(this.roomName, this.message.trim())
      .subscribe(response => {
        this.reset();
      }, error => {
        this.reset();
        alert(error.error);
      })
  }

  private reset() {
    this.message = '';
  }
  ngOnDestroy() {
    if (this.subSendMessage)
      this.subSendMessage.unsubscribe();
    if (this.subFindAllMessage)
      this.subFindAllMessage.unsubscribe();
    if (this.stompClient) {
      this.wsService.closeConnection(this.stompClient);
      this.stompClient.disconnect();
    }
    if (this.subFindByUsersInRoom)
      this.subFindByUsersInRoom.unsubscribe();
  }
}
