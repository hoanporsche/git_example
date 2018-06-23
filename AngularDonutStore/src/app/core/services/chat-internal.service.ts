import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { API_URL, MODEL_URL } from '../../shared/constants/api.constant';

@Injectable()
export class ChatInternalService extends BaseService {

  private joinRoomUrl = environment.baseUrl + API_URL.API + MODEL_URL.ROOM_DB + API_URL.JOIN_ROOM;
  private sendMessageUrl = environment.baseUrl + API_URL.API + MODEL_URL.MESSAGE_DB + API_URL.SEND_MESSAGE;
  private findAllMessageUrl = environment.baseUrl + API_URL.API + MODEL_URL.MESSAGE_DB + API_URL.FIND_ALL;
  private findListMessageUrl = environment.baseUrl + API_URL.API + MODEL_URL.MESSAGE_DB + API_URL.FIND_LIST;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  joinRoom(param: {}): Observable<any> {
    return this.get(this.joinRoomUrl, param);
  }

  sendMessage(roomName, text): Observable<any> {
    return this.post(this.sendMessageUrl + '/' + roomName, text);
  }

  findAll(param: {}): Observable<any> {
    return this.get(this.findAllMessageUrl, param);
  }

  findList(param: {}): Observable<any> {
    return this.get(this.findListMessageUrl, param);
  }
}
