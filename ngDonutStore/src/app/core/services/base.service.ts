import { LOCAL_STORAGE } from '../../shared/constants/local-storage.constant';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '@angular/compiler';

/**
* @WhatItDoes defines all common services to api servers
* @Author LDThien
* @Date 2018/02/27
*/
@Injectable()
export class BaseService {

  constructor(
    public httpClient: HttpClient,
  ) { }

  get(url: string, params?: {}): Observable<any> {
    return this.httpClient.get(url, { 
      headers: this.createHeaders(),
      params,
    }); 
  }

  /**
   * Create a new entity.
   * @param url the api url
   * @param data the entity to create
   */
  post(url: string, data: any): Observable<any> {
    return this.httpClient.post(url, data, { headers: this.createHeaders() || {}});
  }

  /**
   * Update an entity.
   * @param url the api url
   * @param data the entity to be updated
   */
  put(url: string, data: any): Observable<any> {
    return this.httpClient.put(url, data, { headers: this.createHeaders() || {}});
  }

  /**
   * Delete an entity.
   * @param url the api url
   * @param id the entity id to be deleted
   */
  delete(url: string, id: any): Observable<any> {
    return this.httpClient.delete(url, { headers: this.createHeaders() || {}});
  }

  public createHeaders() {
    return  new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken().strValue);
  }
  private getToken(): Token {
    return <Token> JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN));
  }
}
