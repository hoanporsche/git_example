import { Category } from './../category';
import { Observable } from 'rxjs/Observable';
import { API_URL, MODEL_URL } from './../../../shared/constants/api.constant';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../../core/services/base.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService extends BaseService {
  private findAllUrl = environment.baseUrl + MODEL_URL.CATEGORY + API_URL.FIND_ALL;
  private findListUrl = environment.baseUrl + MODEL_URL.CATEGORY + API_URL.FIND_LIST;
  private findByNameUrl = environment.baseUrl + MODEL_URL.CATEGORY + API_URL.FIND_BY_NAME;
  private saveUrl = environment.baseUrl + MODEL_URL.CATEGORY + API_URL.SAVE;
  private enabledOrNotUrl = environment.baseUrl + MODEL_URL.CATEGORY + API_URL.ENABLED_OR_NOT;

  private category = new Category();

  getCategory() {
    return this.category;
  }
  setCategory(category) {
    this.category = category;
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

  findByName(name: string): Observable<any> {
    return this.get(this.findByNameUrl, { name: name });
  }

  save(params: {}): Observable<any> {
    return this.post(this.saveUrl, params);
  }

  enabledOrNot(params: {}): Observable<any> {
    return this.get(this.enabledOrNotUrl, params);
  }
}
