import { LocalStorageService } from './../../../core/services/local-storage.service';
import { IdentityService } from '../../../core/services/identity.service';
import { LOCAL_STORAGE } from './../../../shared/constants/local-storage.constant';
import { ResetPasswordService } from './../../services/reset-password.service';
import { LoginService } from './../../services/login.service';
import { NavigationService } from '../../../core/services/navigation.service';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { User } from '../../../model/user/user';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message = ''; // display the error message
  loading = false; // show/hide the loading icon of the login button
  constraints = {
    username: {
      maxlength: 50,
    },
    password: {
      maxlength: 50,
    }
  };
  
  private redirect: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private loginService: LoginService,
    private resetService: ResetPasswordService,
    private identityService: IdentityService,
    private localStorageService: LocalStorageService
  ) {
    if (this.identityService.isLoggedIn()) {
      this.navigationService.navHomepage();
    }
  }

  loginForm = (new FormBuilder()).group({
    username: [''],
    password: ['']
  });

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    const query = this.route.snapshot.queryParamMap;
    
    const autoLogin = query.get("auto_login") === "true" ? true : false;
  }
  
  login(auto?: boolean) {
    this.loading = true;
    this.message = '';
    const user = new User();
    user.email = this.username.value;
    user.password = this.password.value;
    this.loginService.login(user)
      .subscribe((token: Response) => {
        // console.log(token);
        if (token.status === 200) {
          this.localStorageService.setItem(LOCAL_STORAGE.TOKEN,JSON.stringify(token.json().access_token));
          this.loading = false;
          this.identityService.initializeCurrentUser();
          this.navigationService.navHomepage();
        } 
      }, (error: Response) => {
        console.log(error.status)
        this.loading = false;
        if (error.status === 400){
          this.message = 'Wrong password or username';
        } else {
          this.message = 'Problem occurs. Please try again later';
        }
      })
  }

  navForgotPassword() {
    this.navigationService.navForgotPassword();
  }


  displaySignInForm() {
    const login = $('#m_login');
    login.removeClass('m-login--forget-password');
    login.removeClass('m-login--signup');
    login.addClass('m-login--signin');
    (<any>login.find('.m-login__signin')).animateClass('flipInX animated');
}

  displayForgetPasswordForm() {
    const login = $('#m_login');
    login.removeClass('m-login--signin');
    login.removeClass('m-login--signup');

    login.addClass('m-login--forget-password');
    (<any>login.find('.m-login__forget-password')).animateClass('flipInX animated');
}
}
