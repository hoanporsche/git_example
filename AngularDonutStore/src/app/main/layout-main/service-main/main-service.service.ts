import { Observable } from 'rxjs/Observable';
import { API_URL } from './../../../shared/constants/api.constant';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { MODEL_URL } from '../../../shared/constants/api.constant';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class MainService {

  private findAllCategoryUrl = environment.baseUrl + MODEL_URL.CATEGORY + API_URL.FIND_ALL;
  private findAllItemUrl = environment.baseUrl + MODEL_URL.ITEM+ API_URL.FIND_ALL;
  private findAllStoreUrl = environment.baseUrl + MODEL_URL.STORE+ API_URL.FIND_ALL;

  constructor(private http: Http) { }

  findAllCategory(): Observable<any> {
    return this.http.get(this.findAllCategoryUrl).map(response => response.json());
  }

  findAllItem(): Observable<any> {
    return this.http.get(this.findAllItemUrl).map(response => response.json());
  }

  findAllStore(): Observable<any> {
    return this.http.get(this.findAllStoreUrl).map(response => response.json());
  }

}
