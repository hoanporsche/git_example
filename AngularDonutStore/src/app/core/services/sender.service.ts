import { Observable } from 'rxjs/Observable';
import { API_URL, MODEL_URL } from './../../shared/constants/api.constant';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SenderService extends BaseService {

  private findAllInternalUrl = environment.baseUrl + API_URL.API + MODEL_URL.SENDER_DB + API_URL.FIND_ALL_INTERNAL;
  private findAllNotInternalTodayUrl = environment.baseUrl + API_URL.API + MODEL_URL.SENDER_DB + API_URL.FIND_ALL_NOT_INTERNAL_TODAY;
  private findAllNotInternalUrl = environment.baseUrl + API_URL.API + MODEL_URL.SENDER_DB + API_URL.FIND_ALL_NOT_INTERNAL;
  
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  findAllInternal(param: {}): Observable<any> {
    return this.get(this.findAllInternalUrl, param);
  }
  findAllNotInternalToday(param: {}): Observable<any> {
    return this.get(this.findAllNotInternalTodayUrl, param);
  }
  findAllNotInternal(param: {}): Observable<any> {
    return this.get(this.findAllNotInternalUrl, param);
  }
}
