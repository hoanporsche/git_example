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

  private chatUrl = 'ws://localhost:6789' + '/chat';
  constructor(
    private wsService: WebSocketService
  ) {
    this.messages = <Subject<Message>>wsService
      .connect(this.chatUrl)
      .map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        }
      });
  }

}
