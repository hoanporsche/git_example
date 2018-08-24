import { Observable } from 'rxjs/Observable';
import { API_URL } from './../../shared/constants/api.constant';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseService } from '../../core/services/base.service';

@Injectable()
export class GetAllService extends BaseService {
  constructor(
    httpClient: HttpClient
  ) {
    super(httpClient);
  }
}
