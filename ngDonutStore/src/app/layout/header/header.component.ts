import { LocalStorageService } from './../../core/services/local-storage.service';
import { User } from './../../model/user.class';
import { IdentityService } from '../../core/services/identity.service';
import { LOCAL_STORAGE } from './../../shared/constants/local-storage.constant';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScriptLoaderService } from '../../core/services/script-loader.service';
import { NavigationService } from '../../core/services/navigation.service';

declare let mLayout: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  currentUser: User;
  constructor(
    private router: Router,
    private _script: ScriptLoaderService,
    private navigationService: NavigationService,
    private identityService: IdentityService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.currentUser = this.identityService.getCurrentUser();
  }

  logout() {
    // clear token remove user from local storage to log user out
    this.localStorageService.removeItem(LOCAL_STORAGE.CURRENT_USER);
    this.localStorageService.removeItem(LOCAL_STORAGE.TOKENS);

    this.navigationService.navLogin();
}

  ngAfterViewInit() {
    this._script.load('app-header',
    'assets/demo/default/custom/header/actions.js').then(() => {
          console.log('actions.js for header loaded in AppHeaderComponent');
      });
      mLayout.initHeader();

  }

  navRequestCreate() {
    this.navigationService.navRequestCreate();
  }
  navCandidateCreate() {
    this.navigationService.navCandidateCreate();
  }
  navCvCreate() {
    this.navigationService.navCvCreate();
  }
  navInterviewCreate() {
    this.navigationService.navInterviewCreate();
  }
  navMyProfile() {
    this.navigationService.navMyProfile();
  }
}
