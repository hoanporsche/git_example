import { BaseService } from './../../../../core/services/base.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { MODEL_URL, API_URL } from '../../../../shared/constants/api.constant';
import { TimekeepingStatus } from '../timekeeping-status';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TimekeepingStatusService extends BaseService {

  private findAllUrl = environment.baseUrl + API_URL.API + MODEL_URL.TIMEKEEPING_STATUS + API_URL.FIND_ALL;
  private findListUrl = environment.baseUrl + API_URL.API + MODEL_URL.TIMEKEEPING_STATUS + API_URL.FIND_LIST;
  private saveUrl = environment.baseUrl + API_URL.API + MODEL_URL.TIMEKEEPING_STATUS + API_URL.SAVE;
  private findByNameUrl = environment.baseUrl + API_URL.API + MODEL_URL.TIMEKEEPING_STATUS + API_URL.FIND_BY_NAME;
  private enabledOrNotUrl = environment.baseUrl + API_URL.API + MODEL_URL.TIMEKEEPING_STATUS + API_URL.ENABLED_OR_NOT;

  private timekeepingStatus = new TimekeepingStatus();

  getTimekeepingStatus() {
    return this.timekeepingStatus;
  }
  setTimekeepingStatus(timekeepingStatus) {
    this.timekeepingStatus = timekeepingStatus;
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

  findByName(name): Observable<any> {
    return this.get(this.findByNameUrl, { name: name });
  }

  save(params: {}): Observable<any> {
    return this.post(this.saveUrl, params);
  }

  enabledOrNot(params: {}): Observable<any> {
    return this.get(this.enabledOrNotUrl, params);
  }

}
