import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import { environment } from '../../../../environments/environment';
import { MODEL_URL, API_URL } from '../../../shared/constants/api.constant';
import { Material } from '../material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MaterialService extends BaseService {
  private findAllUrl = environment.baseUrl + MODEL_URL.MATERIAL + API_URL.FIND_ALL;
  private findListUrl = environment.baseUrl + MODEL_URL.MATERIAL + API_URL.FIND_LIST;
  private saveUrl = environment.baseUrl + MODEL_URL.MATERIAL + API_URL.SAVE;
  private findByNameUrl = environment.baseUrl + MODEL_URL.MATERIAL + API_URL.FIND_BY_NAME;
  private enabledOrNotUrl = environment.baseUrl + MODEL_URL.MATERIAL + API_URL.ENABLED_OR_NOT;

  private material = new Material();

  getMaterial() {
    return this.material;
  }
  setMaterial(material) {
    this.material = material;
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