import { IdentityService } from '../../core/services/identity.service';
import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { NavigationService } from '../../core/services/navigation.service';

declare let mLayout: any;

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.css']
})
export class AsideNavComponent implements OnInit, AfterViewInit {
  isAdmin = false;
  isStaff = false;
  isStore = false;
  isDuLead = false;
  isDuMember = false;
  isHrManager = false;
  isHrMember = false;
  constructor(
    private navigationService: NavigationService,
    private identityService: IdentityService
  ) { 
    this.isAdmin = this.identityService.isAdmin();
    this.isStaff = this.identityService.isStaff();
    this.isStore = this.identityService.isStore();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {

    mLayout.initAside();
    const menu = mLayout.getAsideMenu();
    const item = $(menu)
      .find('a[href="' + window.location.pathname + '"]')
      .parent('.m-menu__item');
    (<any>$(menu).data('menu')).setActiveItem(item);
  }

  navCategoryList() {
    this.navigationService.navCategoryList();
  }
}
