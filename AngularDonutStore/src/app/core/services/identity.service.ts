import { LocalStorageService } from './local-storage.service';
import { API_URL } from './../../shared/constants/api.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import { LOCAL_STORAGE } from '../../shared/constants/local-storage.constant';
import { ROLES } from '../../shared/constants/role.constant';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt'; 
import { User } from '../../management/model/user/user';

@Injectable()
export class IdentityService {
  // These 02 properties will be set right in AppComponent -> ngOnInit()
  private currentUser;
  private token: Token;

  constructor(
    private httpClient: HttpClient,
    localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.initializeCurrentUser();
    this.initializeToken();
  }

  /**
  * @WhatItDoes Get token from localStorage and assign to the property of this service.
  * It will be called immediately when AppComponent Init()
  * @Author LDThien
  * @Date 2018/03/06
  */
  initializeToken() {
    try {
      this.token = <Token> JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN));
    } catch (err) {
      this.token = null;
      console.log('>>> Error parse token from localStorage:', err);
      this.router.navigateByUrl('/auth/login');
    }
  }

  /**
  * @WhatItDoes Get currently logged in user from localStorage.
  * and assign to the property of this service.
  * It will be called immediately when AppComponent Init()
  * @Author LDThien
  * @Date 2018/03/06
  */
  initializeCurrentUser() {
    try {
      // this.currentUser = <User>JSON.parse(localStorage.getItem(LOCAL_STORAGE.CURRENT_USER));
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      if (token){
        const jwt = new JwtHelper();
        this.currentUser = jwt.decodeToken(token);
      }
    } catch (err) {
      this.currentUser = null;
      console.log('>>> Error parse token from localStorage:', err);
    }
  }

  getToken() {
    return this.token;
  }
  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(currentUser: User) {
    this.currentUser = currentUser;
  }

  setToken(token: Token) {
    this.token = token;
  }

  isLoggedIn() {
    return this.token !== null;
  }
  isAdmin() {
    return this.getStringRoles().includes(ROLES.ADMIN);
  }
  isStaff() {
    return this.getStringRoles().includes(ROLES.STAFF);
  }
  isStore() {
    return this.getStringRoles().includes(ROLES.STORE);
  }
  getTopRole() {
    if (this.getStringRoles().includes(ROLES.ADMIN)) {
      return ROLES.ADMIN;
    }
    if (this.getStringRoles().includes(ROLES.STAFF)) {
      return ROLES.STAFF;
    }
    if (this.getStringRoles().includes(ROLES.STORE)) {
      return ROLES.STORE;
    }
  }
  getStringRoles(): string[] {
    if (this.currentUser) {
      return this.currentUser.authorities;
    }
    return [];
  }

}
