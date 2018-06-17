import { API_URL } from './../../shared/constants/api.constant';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatFreeService {

  private createRoomUrl = environment.baseUrl + API_URL.CREATE_ROOM;

  constructor(private http: Http) { }

  createRoom(sender): Observable<any> {
    return this.http.post(this.createRoomUrl, sender).map(response => response.json());
  }
}
