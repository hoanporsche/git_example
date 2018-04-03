import { IdentityService } from './identity.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {

  constructor(
    private router: Router,
    private identityService: IdentityService,
  ) { }

  public getRoleSegment(): string {
    if (this.identityService.isAdmin()) {
      return '/admin';
    } else if (this.identityService.isStaff()) {
      return '/staff';
    } else if (this.identityService.isStore()) {
      return '/store';
    } else {
      this.navLogin();
    }
  }

  navHomepage() {
    if (this.identityService.isAdmin()) {
      this.navUserList();
    } else if (this.identityService.isStaff()) {
      this.navStaffList();
    } else if (this.identityService.isStore()) {
      this.navMaterialDailyReportList();
    } else {
      this.navLogin();
    }
  }

  navLogin() {
    this.router.navigateByUrl('/auth/login');
  }

  navMyProfile() {
    this.router.navigateByUrl(this.getRoleSegment() + '/user/detail');
  }

  navForgotPassword() {
    this.router.navigateByUrl('/auth/forgot-password');
  }

  // User page navigation for admin only
  navUserList() {
    if (this.identityService.isAdmin()) {
      this.router.navigateByUrl(this.getRoleSegment() + '/user');
    } else {
      console.log('You are not authorized');
    }
  }

  //Category nav
  navCategoryList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/category');
  }

  //Item nav
  navItemList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/item');
  }

  //Material
  navMaterialList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/material');
  }

  //Material-daily-report
  navMaterialDailyReportList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/material-daily-report');
  }
  navMaterialDailyReportCreate() {
    this.router.navigateByUrl(this.getRoleSegment() + '/material-daily-report/create');
  }

  //Order
  navOrderList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/order');
  }
  navOrderCreate() {
    this.router.navigateByUrl(this.getRoleSegment() + '/order/create');
  }
  navOrderDetail(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/order/detail/' + id);
  }

  //Order-status
  navOrderStatusList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/order-status');
  }

  //Quantity
  navQuantityList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/quantity');
  }

  //role
  navRoleList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/role');
  }

  //staff
  navStaffList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/staff');
  }

  //store
  navStoreList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/store');
  }

  //supply
  navSupplyList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/supply');
  }

  //timekeeping
  navTimekeepingList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/timekeeping');
  }

  //timekeeping-status
  navTimekeepingStatusList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/timekeeping-status');
  }

  //working-calender
  navWorkingCalenderList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/working-calender');
  }

  navErrorNotFound() {
    this.router.navigateByUrl('/error/not-found');
  }
  navErrorUnauthorized() {
    this.router.navigateByUrl('/error/unauthorized');
  }
  navErrorGeneral() {
    this.router.navigateByUrl('/error/general');
  }
}
