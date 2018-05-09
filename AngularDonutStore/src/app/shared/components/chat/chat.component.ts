import { WebSocketService } from './../../../core/services/web-socket.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';

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
  private appChatUrl = '/app/chat';
  private messageUrl = '/topic/messages';

  constructor(
    private wsService: WebSocketService,
  ) { }

  ngOnInit() {
  }

  emitAction(event) {
    if (event === 'byFb') {
      console.log(event === 'byFb');
    } else {
      this.currentUser = event;
      this.connect();
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
      this.stompClient.subscribe(this.messageUrl, messageOutput => {
        this.showMessages(messageOutput);
      })
    });
  }

  sendMessage(message) {
    this.stompClient.send(this.appChatUrl, {}, JSON.stringify({
      from: this.currentUser,
      text: message
    }));
  }

  showMessages(messages) {
    console.log(messages);
    if (messages.body) {
      // $(".ds-all-messages").append(
      //   "<div class='col-12 ds-message'>"
      //     + "<div class='col-12'>"
      //       + "<div class='float-right'><h5>"+ receivedFoundUser.name +"</h5></div>"
      //     + "</div>"
      //     + "<div class='col-12'>"
      //       + "<div class='ds-sent-message float-right'>" +recivedMessage.text + "</div>"
      //     + "</div>"
      //   +"</div>");
      this.allReceivedMessages.push(JSON.parse(messages.body));
    }
  }

  openBox() {
    this.isOpen = true;
  }
  closeBox() {
    this.isOpen = false;
    this.currentUser = undefined;
    this.stompClient.disconnect();
  }

  ngOnDestroy() {
    if (this.stompClient)
      this.stompClient.disconnect();
  }
}
