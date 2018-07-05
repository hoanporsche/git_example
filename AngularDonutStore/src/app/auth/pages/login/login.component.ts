import { Helpers } from './../../../helpers';
import { LocalStorageService } from './../../../core/services/local-storage.service';
import { IdentityService } from '../../../core/services/identity.service';
import { LOCAL_STORAGE } from './../../../shared/constants/local-storage.constant';
import { ResetPasswordService } from './../../services/reset-password.service';
import { LoginService } from './../../services/login.service';
import { NavigationService } from '../../../core/services/navigation.service';
import { Response } from '@angular/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { User } from '../../../management/model/user/user';
import { Subscription } from 'rxjs/Subscription';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
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
  private subLogin: Subscription;
  private subFindInfo: Subscription;

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
    Helpers.setLoading(false);
    const query = this.route.snapshot.queryParamMap;

    const autoLogin = query.get("auto_login") === "true" ? true : false;
  }

  login(auto?: boolean) {
    Helpers.setLoading(true);
    this.loading = true;
    this.message = '';
    const user = new User();
    user.email = this.username.value;
    user.password = this.password.value;
    this.subLogin = this.loginService.login(user)
      .subscribe((token: Response) => {
        console.log(token.json());
        if (token.status === 200) {
          // this.localStorageService.setItem(LOCAL_STORAGE.TOKEN, JSON.stringify(token.json().access_token));
          this.localStorageService.setItem(LOCAL_STORAGE.TOKEN, JSON.stringify(token.json()));
          this.getInfo();
          this.loading = false;
          Helpers.setLoading(false);
        }
      }, (error: Response) => {
        Helpers.setLoading(false);
        this.loading = false;
        if (error.status === 400) {
          this.message = 'Wrong password or username';
        } else {
          this.message = 'Problem occurs. Please try again later';
        }
      })
  }

  getInfo() {
    this.subFindInfo = this.loginService.getInfo()
      .subscribe(response => {
        this.localStorageService.setItem(LOCAL_STORAGE.CURRENT_USER, JSON.stringify(response));
        this.identityService.initializeCurrentUser();
        this.navigationService.navHomepage();
      }, error => {

      })
  }

  navForgotPassword() {
    this.navigationService.navForgotPassword();
  }

  onCancel() {
    this.navigationService.navHome();
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

  ngOnDestroy(): void {
    if (this.subLogin)
      this.subLogin.unsubscribe();
    if (this.subFindInfo)
      this.subFindInfo.unsubscribe();
  }
}
