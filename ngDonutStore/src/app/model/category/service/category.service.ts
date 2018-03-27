import { Observable } from 'rxjs/Observable';
import { API_URL, MODEL_URL } from './../../../shared/constants/api.constant';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../../core/services/base.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService extends BaseService {
  private findListUrl = environment.baseUrl + MODEL_URL.CATEGORY + API_URL.FIND_LIST;
  private saveUrl = environment.baseUrl + MODEL_URL.CATEGORY + API_URL.SAVE;
  private enabledOrNotUrl = environment.baseUrl + MODEL_URL.CATEGORY + API_URL.ENABLED_OR_NOT;

  constructor(httpClient: HttpClient) {
    super(httpClient);
   }

  findList(params: {}): Observable<any> {
    return this.get(this.findListUrl, params);
  }

  save(params: {}): Observable<any> {
    return this.post(this.saveUrl, params);
  }

  enabledOrNot(params: {}): Observable<any> {
    return this.get(this.enabledOrNotUrl, params);
  }
}
