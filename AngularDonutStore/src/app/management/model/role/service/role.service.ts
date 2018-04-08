import { BaseService } from './../../../../core/services/base.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { MODEL_URL, API_URL } from '../../../../shared/constants/api.constant';
import { Role } from '../role';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleService extends BaseService {

  private findAllUrl = environment.baseUrl + MODEL_URL.ROLE + API_URL.FIND_ALL;
  private findListUrl = environment.baseUrl + MODEL_URL.ROLE + API_URL.FIND_LIST;
  private findByNameUrl = environment.baseUrl + MODEL_URL.ROLE + API_URL.FIND_BY_NAME;
  private saveUrl = environment.baseUrl + MODEL_URL.ROLE + API_URL.SAVE;
  private enabledOrNotUrl = environment.baseUrl + MODEL_URL.ROLE + API_URL.ENABLED_OR_NOT;

  private role = new Role();

  getRole() {
    return this.role;
  }
  setRole(role) {
    this.role = role;
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
