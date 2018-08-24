import { Observable } from 'rxjs/Observable';
import { API_URL, MODEL_URL } from './../../shared/constants/api.constant';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SenderService extends BaseService {

  private findAllInternalUrl = environment.baseUrl + API_URL.API + MODEL_URL.SENDER_DB + API_URL.FIND_ALL_INTERNAL;
  private findAllNotInternalIn24HUrl = environment.baseUrl + API_URL.API + MODEL_URL.SENDER_DB + API_URL.FIND_ALL_NOT_INTERNAL_IN_24H;
  private findAllNotInternalUrl = environment.baseUrl + API_URL.API + MODEL_URL.SENDER_DB + API_URL.FIND_ALL_NOT_INTERNAL;
  private findAllNotInternalIn24HInChargeOfUserUrl = environment.baseUrl + API_URL.API + MODEL_URL.SENDER_DB + API_URL.FIND_ALL_NOT_INTERNAL_IN_24H_IN_CHARGE_OF_USER;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  findAllInternal(param: {}): Observable<any> {
    return this.get(this.findAllInternalUrl, param);
  }
  findAllNotInternalIn24h(param: {}): Observable<any> {
    return this.get(this.findAllNotInternalIn24HUrl, param);
  }
  findAllNotInternal(param: {}): Observable<any> {
    return this.get(this.findAllNotInternalUrl, param);
  }
  findAllNotInternalIn24hInChargeOfUser(param: {}): Observable<any> {
    return this.get(this.findAllNotInternalIn24HInChargeOfUserUrl, param);
  }
}
