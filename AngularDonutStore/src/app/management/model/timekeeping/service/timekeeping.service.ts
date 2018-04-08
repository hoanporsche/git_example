import { BaseService } from './../../../../core/services/base.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Timekeeping } from '../timekeeping';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MODEL_URL, API_URL } from '../../../../shared/constants/api.constant';

@Injectable()
export class TimekeepingService extends BaseService {

  private findListUrl = environment.baseUrl + MODEL_URL.TIMEKEEPING + API_URL.FIND_LIST;
  private findDailyReportUrl = environment.baseUrl + MODEL_URL.TIMEKEEPING + API_URL.FIND_DAILY_REPORT;
  private saveUrl = environment.baseUrl + MODEL_URL.TIMEKEEPING + API_URL.SAVE;

  constructor(httpClient: HttpClient) { 
    super(httpClient);
  }

  findList(params: {}): Observable<any> {
    return this.get(this.findListUrl, params);
  }

  findDailyReport(params: {}): Observable<any> {
    return this.get(this.findDailyReportUrl, params);
  }

  save(params: Timekeeping[], storeName?: string): Observable<any> {
    return this.post(this.saveUrl + '?name=' + storeName, params);
  }

}
