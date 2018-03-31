import { BaseService } from './../../../core/services/base.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MODEL_URL, API_URL } from '../../../shared/constants/api.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../user';

@Injectable()
export class UserService extends BaseService {

  private findListUrl = environment.baseUrl + MODEL_URL.USER + API_URL.FIND_LIST;
  private saveUrl = environment.baseUrl + MODEL_URL.USER + API_URL.SAVE;
  private findByEmailUrl = environment.baseUrl + MODEL_URL.USER + API_URL.FIND_BY_EMAIL;
  private enabledOrNotUrl = environment.baseUrl + MODEL_URL.USER + API_URL.ENABLED_OR_NOT;
  private resetPasswordUrl = environment.baseUrl + MODEL_URL.USER + API_URL.RESET_PASSWORD;

  private user = new User();

  getUser() {
    return this.user;
  }
  setUser(user) {
    this.user = user;
  }

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  
  findList(params: {}): Observable<any> {
    return this.get(this.findListUrl, params);
  }

  findByEmail(email): Observable<any> {
    return this.get(this.findByEmailUrl, { email: email });
  }

  save(params: {}): Observable<any> {
    return this.post(this.saveUrl, params);
  }

  enabledOrNot(params: {}): Observable<any> {
    return this.get(this.enabledOrNotUrl, params);
  }

  resetPassword(email): Observable<any> {
    return this.get(this.resetPasswordUrl, { email: email });
  }

}
