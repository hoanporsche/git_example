import { Observable } from 'rxjs/Observable';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { API_URL, MODEL_URL } from '../../shared/constants/api.constant';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotificationService extends BaseService {

  private findListUrl = environment.baseUrl + API_URL.API + MODEL_URL.NOTIFICATION + API_URL.FIND_LIST;
  private userHasSeenUrl = environment.baseUrl + API_URL.API + MODEL_URL.NOTIFICATION + API_URL.USER_HAS_SEEN;
  private countNotSeenNotiUrl = environment.baseUrl + API_URL.API + MODEL_URL.NOTIFICATION + API_URL.COUNT_NOT_SEEN_NOTI;

  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  findList(params: {}): Observable<any> {
    return this.get(this.findListUrl, params);
  }

  userHasSeen(params: {}): Observable<any> {
    return this.get(this.userHasSeenUrl, params);
  }

  countNotSeenNoti(): Observable<any> {
    return this.get(this.countNotSeenNotiUrl);
  }
}
