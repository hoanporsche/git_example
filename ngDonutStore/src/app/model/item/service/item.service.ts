import { BaseService } from './../../../core/services/base.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MODEL_URL, API_URL } from '../../../shared/constants/api.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService extends BaseService {
  private findListUrl = environment.baseUrl + MODEL_URL.ITEM + API_URL.FIND_LIST;
  private saveUrl = environment.baseUrl + MODEL_URL.ITEM + API_URL.SAVE;
  private enabledOrNotUrl = environment.baseUrl + MODEL_URL.ITEM + API_URL.ENABLED_OR_NOT;

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
