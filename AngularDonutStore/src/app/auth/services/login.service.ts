import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { environment } from './../../../environments/environment';
import { API_URL } from './../../shared/constants/api.constant';
import { BaseService } from '../../core/services/base.service';
import 'rxjs/add/operator/map';
import { Token } from '@angular/compiler';
import { User } from '../../management/model/user/user';

@Injectable()
export class LoginService extends BaseService {
  loginUrl = 'http://localhost:6789' + API_URL.LOGIN;
  constructor(
    httpClient: HttpClient,
    private http: Http,
  ) {
    super(httpClient);
  }

  login(user: User): Observable<Response> {
    const body = `username=${encodeURIComponent(user.email)}&password=${encodeURIComponent(user.password)}&grant_type=password`;

    // add authorize header with jwt token
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa('demo-clientid' + ':' + 'demo-secret'));

    return this.http.post(this.loginUrl, body, { headers });
  }
}
