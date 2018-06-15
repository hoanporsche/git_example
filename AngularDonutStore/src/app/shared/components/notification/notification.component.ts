import { IdentityService } from './../../../core/services/identity.service';
import { WebSocketService } from './../../../core/services/web-socket.service';
import { NotificationService } from './../../../core/services/notification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CONFIG } from '../../constants/configuration.constant';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  private chatUrl = environment.baseUrl + '/chat';
  private notificationUrl = '/topic/notification/';

  listNotification: any[];
  private currentUser;
  private stompClient;

  private subListNotification: Subscription;
  private subUserHasSeen: Subscription;

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
    private wsService: WebSocketService,
  ) { }

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
    this.stompClient = this.wsService.connect(this.chatUrl);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(this.notificationUrl + this.currentUser.user_name, notification => {
        console.log(notification);
        //push new noti on the top
        this.listNotification.splice(0,0,JSON.parse(notification.body));
      });
    });
  }

  onSeenNoti(id, index) {
    console.log("seen notification", id, "index", index);
    this.subUserHasSeen = this.notificationService.userHasSeen({id: id})
      .subscribe(response => {
        console.log(response);
        this.listNotification[index] = response;
        console.log(this.listNotification[index])
      });
  }

  ngOnDestroy(): void {
    if (this.subListNotification)
      this.subListNotification.unsubscribe();
    if (this.stompClient)
      this.stompClient.disconnect();
  }
}
