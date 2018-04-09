import { Observable } from 'rxjs/Observable';
import { MODEL_URL, API_URL } from './../../../../shared/constants/api.constant';
import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../../../core/services/base.service';
import { Injectable } from '@angular/core';

@Injectable()
export class QuantityService extends BaseService {

  private findListUrl = environment.baseUrl + API_URL.API + MODEL_URL.QUANTITY + API_URL.FIND_LIST;

  constructor(httpClient: HttpClient) { 
    super(httpClient);
  }

  findList(params: {}): Observable<any> {
    return this.get(this.findListUrl, params);
  }

}
