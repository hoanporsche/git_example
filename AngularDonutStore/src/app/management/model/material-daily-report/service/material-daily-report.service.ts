import { MaterialDailyReport } from './../material-daily-report';
import { BaseService } from './../../../../core/services/base.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { MODEL_URL, API_URL } from '../../../../shared/constants/api.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MaterialDailyReportService extends BaseService {

  private findListUrl = environment.baseUrl + API_URL.API + MODEL_URL.MATERIAL_DAILY_REPORT + API_URL.FIND_LIST;
  private findDailyReportUrl = environment.baseUrl + API_URL.API + MODEL_URL.MATERIAL_DAILY_REPORT + API_URL.FIND_DAILY_REPORT;
  private saveUrl = environment.baseUrl + API_URL.API + MODEL_URL.MATERIAL_DAILY_REPORT + API_URL.SAVE;

  constructor(httpClient: HttpClient) { 
    super(httpClient);
  }

  findList(params: {}): Observable<any> {
    return this.get(this.findListUrl, params);
  }

  findDailyReport(params: {}): Observable<any> {
    return this.get(this.findDailyReportUrl, params);
  }

  save(params: MaterialDailyReport[], storeName?: string): Observable<any> {
    return this.post(this.saveUrl + '?name=' + storeName, params);
  }

}
