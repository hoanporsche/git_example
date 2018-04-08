import { BaseService } from './../../../../core/services/base.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { MODEL_URL, API_URL } from '../../../../shared/constants/api.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService extends BaseService {

  private findListUrl = environment.baseUrl + MODEL_URL.ORDER + API_URL.FIND_LIST;

  constructor(httpClient: HttpClient) { 
    super(httpClient);
  }

  findList(params: {}): Observable<any> {
    return this.get(this.findListUrl, params);
  }

}
