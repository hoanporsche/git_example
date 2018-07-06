import { CHAT_URL } from './../../constants/api.constant';
import { Subscription } from 'rxjs/Subscription';
import { ChatInternalService } from './../../../core/services/chat-internal.service';
import { IdentityService } from './../../../core/services/identity.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CONFIG } from '../../constants/configuration.constant';
import { UserJson } from '../../../management/model/user/user-json';
import { environment } from '../../../../environments/environment';
import { WebSocketService } from '../../../core/services/web-socket.service';

@Component({
  selector: 'app-chat-internal',
  templateUrl: './chat-internal.component.html',
  styleUrls: ['./chat-internal.component.css']
})
export class ChatInternalComponent implements OnInit, OnDestroy {
  
  currentUser: UserJson;
  isOpen = false;
  sender: any;
  openChat = false;

  constructor(
    private identityService: IdentityService,
  ) {
   }

  ngOnInit() {
    this.currentUser = this.identityService.getCurrentUser();
  }

  getEmitSender(event) {
    this.sender = event;
    this.openChat = true;
  }
  
  openBox() {
    this.isOpen = true;
  }
  closeBox() {
    this.isOpen = false;
    this.reset();
  }

  private reset() {
    this.currentUser = undefined;
    this.sender = undefined;
    this.openChat = false
  }
  ngOnDestroy(): void {
    if (this.currentUser)
      this.currentUser = undefined;
  }

}
