import { Subscription } from 'rxjs/Subscription';
import { ChatInternalService } from './../../../core/services/chat-internal.service';
import { IdentityService } from './../../../core/services/identity.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CONFIG } from '../../constants/configuration.constant';

@Component({
  selector: 'app-chat-internal',
  templateUrl: './chat-internal.component.html',
  styleUrls: ['./chat-internal.component.css']
})
export class ChatInternalComponent implements OnInit, OnDestroy {

  currentUser;
  @Input() roomName: string;
  allReceivedMessages = [];
  listSender;
  isOpen = false;
  senderName: string;

  params = {
    senderPhone: '',
    page: 0,
    size: CONFIG.PAGE_SIZE,
    sort: 'id,desc'
  }

  private subFindAllMessage: Subscription;
  private subSendMessage: Subscription;
  private subFindListSender: Subscription;

  constructor(
    private identityService: IdentityService,
    private chatInternalService: ChatInternalService,
  ) { }

  ngOnInit() {
    this.currentUser = this.identityService.getCurrentUser();
  }

  findList() {
    this.subFindAllMessage = this.chatInternalService.findAll(this.params)
      .subscribe(response => {
        this.allReceivedMessages = response.content;
        console.log(this.allReceivedMessages);
      }, error => {

      });
  }

  sendMessage(text) {
    this.subSendMessage = this.chatInternalService.sendMessage(this.roomName, text)
      .subscribe(response => {
        this.findList();
      }, error => {

      })
  }

  getEmitSender(event) {
    this.senderName = event.name;
    this.params.senderPhone = event.phone;
    this.findList();
  }
  
  openBox() {
    this.isOpen = true;
    // console.log(this.roomName);
    // this.findList();
  }
  closeBox() {
    this.isOpen = false;
    this.currentUser = undefined;
    // if (this.stompClient)
    //   this.stompClient.disconnect();
  }
  
  emitMessage(event) {
    this.sendMessage(event);
  }

  ngOnDestroy(): void {
    if (this.currentUser)
      this.currentUser = undefined;
    if (this.subSendMessage)
      this.subSendMessage.unsubscribe();
    if (this.subFindAllMessage)
      this.subFindAllMessage.unsubscribe();
  }

}
