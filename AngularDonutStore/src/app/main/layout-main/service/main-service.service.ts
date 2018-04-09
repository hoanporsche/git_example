import { API_URL } from './../../../shared/constants/api.constant';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { MODEL_URL } from '../../../shared/constants/api.constant';
import { environment } from '../../../../environments/environment';

@Injectable()
export class MainServiceService {

  private findAllCategoryUrl = environment.baseUrl + MODEL_URL.CATEGORY + API_URL.FIND_ALL;

  constructor(private http: Http) { }

}
