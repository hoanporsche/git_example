import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class WebSocketService {

  constructor() { }

  public createStomp(url) {
    let socket = new SockJS(url);
    let stompClient = Stomp.over(socket);
    console.log("socket1", socket);
    return stompClient;
  }

  public closeConnection(stompClient) {
    const socket = stompClient.ws;
    console.log("socket2", socket)
  }
  
}
