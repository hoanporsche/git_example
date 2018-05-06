import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { WebSocketService } from './web-socket.service';
import { environment } from '../../../environments/environment';

export interface Message {
  author: string,
  message: string,
}

@Injectable()
export class ChatService {
  public messages: Subject<Message>;

  // private chatUrl = 'ws://localhost:6789' + '/chat';
  private chatUrl = environment.baseUrl + '/chat';
  private appChatUrl = environment.baseUrl + '/app/chat';
  private messageUrl = environment.baseUrl + '/topic/messages';

  private stompClient: any;
  constructor(
    private wsService: WebSocketService
  ) {
    // this.messages = <Subject<Message>>wsService
    //   .connect(this.chatUrl)
    //   .map((response: MessageEvent): Message => {
    //     let data = JSON.parse(response.data);
    //     return {
    //       author: data.author,
    //       message: data.message
    //     }
    //   });

  }

  public connect(): Object {
    let messages;
    this.stompClient = this.wsService.connect(this.chatUrl);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(this.messageUrl, messageOutput => {
        messages = messageOutput;
      })
    });
    return messages;
  }

  public disconnect() {
    if (this.stompClient)
      this.stompClient.disconnect();
  }

  public sendMessage(messageInput) {
    this.stompClient.send(this.appChatUrl, {}, JSON.stringify({
      from: messageInput.from,
      text: messageInput.text
    }))
  }

}
