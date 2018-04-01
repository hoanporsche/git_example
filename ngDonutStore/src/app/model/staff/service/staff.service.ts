import { BaseService } from './../../../core/services/base.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MODEL_URL, API_URL } from '../../../shared/constants/api.constant';
import { Staff } from '../staff';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StaffService extends BaseService {

  private findAllUrl = environment.baseUrl + MODEL_URL.STAFF + API_URL.FIND_ALL;
  private findListUrl = environment.baseUrl + MODEL_URL.STAFF + API_URL.FIND_LIST;
  private saveUrl = environment.baseUrl + MODEL_URL.STAFF + API_URL.SAVE;
  private findByIdentityCardUrl = environment.baseUrl + MODEL_URL.STAFF + API_URL.FIND_BY_IDENTITY_CARD;
  private enabledOrNotUrl = environment.baseUrl + MODEL_URL.STAFF + API_URL.ENABLED_OR_NOT;

  private staff = new Staff();

  getStaff() {
    return this.staff;
  }
  setStaff(staff) {
    this.staff = staff;
  }

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  findAll(): Observable<any> {
    return this.get(this.findAllUrl);
  }

  findList(params: {}): Observable<any> {
    return this.get(this.findListUrl, params);
  }

  findByIdentityCard(name): Observable<any> {
    return this.get(this.findByIdentityCardUrl, { identityCard: name });
  }

  save(params: {}): Observable<any> {
    return this.post(this.saveUrl, params);
  }

  enabledOrNot(params: {}): Observable<any> {
    return this.get(this.enabledOrNotUrl, params);
  }

}