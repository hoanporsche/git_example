import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
// var SockJs = require('sockjs-client');
// var Stomp = require('stompjs');
import * as Rx from 'rxjs';

@Injectable()
export class WebSocketService {
  private subject: Rx.Subject<MessageEvent>;

  constructor() { }

  public connect(url) {
    let socket = new SockJS(url);
    let stompClient = Stomp.over(socket);

    return stompClient;
  }

  // public connect(url): Rx.Subject<MessageEvent> {
  //   if (!this.subject) {
  //     this.subject = this.create(url);
  //     console.log("Successfully connect: ", url);
  //   }
  //   return this.subject;
  // }

  private create(url): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      }
    )

    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    }

    return Rx.Subject.create(observer, observable);
  }
}
