import { BaseService } from './../../../../core/services/base.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Store } from '../store';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MODEL_URL, API_URL } from '../../../../shared/constants/api.constant';

@Injectable()
export class StoreService extends BaseService {

  private findAllUrl = environment.baseUrl + API_URL.API + MODEL_URL.STORE + API_URL.FIND_ALL;
  private findListUrl = environment.baseUrl + API_URL.API + MODEL_URL.STORE + API_URL.FIND_LIST;
  private saveUrl = environment.baseUrl + API_URL.API + MODEL_URL.STORE + API_URL.SAVE;
  private findByNameUrl = environment.baseUrl + API_URL.API + MODEL_URL.STORE + API_URL.FIND_BY_NAME;
  private enabledOrNotUrl = environment.baseUrl + API_URL.API + MODEL_URL.STORE + API_URL.ENABLED_OR_NOT;

  private store = new Store();

  getStore() {
    return this.store;
  }
  setStore(store) {
    this.store = store;
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
