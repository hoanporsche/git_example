import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class WebSocketService {

  constructor() { }

  public createStomp(url) {
    let socket = new SockJS(url);
    let stompClient = Stomp.over(socket);
    return stompClient;
  }

  public closeConnection(stompClient) {
    const socket = stompClient.ws;
    socket.close();
    socket.onclose();
  }
  
}
