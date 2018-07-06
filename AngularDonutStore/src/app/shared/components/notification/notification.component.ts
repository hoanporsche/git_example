import { ChatInternalService } from './../../../core/services/chat-internal.service';
import { IdentityService } from './../../../core/services/identity.service';
import { NotificationService } from './../../../core/services/notification.service';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CONFIG } from '../../constants/configuration.constant';
import { environment } from '../../../../environments/environment';
import { UserJson } from '../../../management/model/user/user-json';
import { CHAT_URL } from '../../constants/api.constant';
import { WebSocketService } from '../../../core/services/web-socket.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  @Output() emitRoomName = new EventEmitter<string>();
  private chatUrl = environment.baseUrl + CHAT_URL.CHAT;
  private topicNotificationUrl = CHAT_URL.TOPIC_NOTIFICATION;

  listNotification: any[];
  private currentUser: UserJson;
  private stompClient;

  private subListNotification: Subscription;
  private subUserHasSeen: Subscription;
  private subJoinRoom: Subscription;

  error = {
    isError: false,
    message: ''
  };
  params = {
    page: 0,
    size: CONFIG.PAGE_SIZE,
    sort: 'id,desc'
  }

  constructor(
    private notificationService: NotificationService,
    private identityService: IdentityService,
    private chatInternalService: ChatInternalService,
    private wsService: WebSocketService,  
  ) { 
    this.stompClient = this.wsService.createStomp(this.chatUrl);
  }

  ngOnInit() {
    this.subListNotification = this.notificationService.findList(this.params)
      .subscribe(response => {
        this.listNotification = response.content;
        //Connect to notification
        this.connect();
      });
    this.currentUser = this.identityService.getCurrentUser();
  }

  connect() {
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(this.topicNotificationUrl + this.currentUser.email, notification => {
        console.log(notification);
        //push new noti on the top
        this.listNotification.splice(0, 0, JSON.parse(notification.body));
      });
    });
  }

  onSeenNoti(id, index) {
    this.subUserHasSeen = this.notificationService.userHasSeen({ id: id })
      .subscribe(response => {
        this.listNotification[index] = response;
        this.onJoinRoomChat(response);
      });
  }

  onJoinRoomChat(notification) {
    const notiText = notification.text.toString();
    const roomName = notiText.substring(30, notiText.length + 1);
    this.subJoinRoom = this.chatInternalService.joinRoom({ name: roomName })
      .subscribe(response => {
        console.log(response);
        // this.emitRoomName.emit(response.name);
      }, error => {
        alert(error.error);
      });
  }
  ngOnDestroy(): void {
    if (this.subListNotification)
      this.subListNotification.unsubscribe();
    if (this.stompClient)
      this.stompClient.disconnect();
    if (this.subUserHasSeen)
      this.subUserHasSeen.unsubscribe();
    if (this.subJoinRoom)
      this.subJoinRoom.unsubscribe();
  }
}
