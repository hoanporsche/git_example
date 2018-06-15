import { IdentityService } from './../../../core/services/identity.service';
import { NavigationService } from './../../../core/services/navigation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent implements OnInit {
  currentUser;
  constructor(
    private navigationService: NavigationService,
    private identityService: IdentityService,
  ) {
  }

  ngOnInit() {
    this.currentUser = this.identityService.getCurrentUser();
  }

  navLogin() {
    this.navigationService.navLogin();
  }

  navManagement() {
    this.navigationService.navHomepage();
  }

  navHome() {
    this.navigationService.navHome();
  }

  navOrder() {
    this.navigationService.navOrder();
  }

  navContact() {
    this.navigationService.navContact();
  }

  navDetail() {
    this.navigationService.navDetail();
  }
}
