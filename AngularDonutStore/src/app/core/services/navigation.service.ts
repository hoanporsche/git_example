import { IdentityService } from './identity.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MODEL_ROUTING, ROUTING_URL } from '../../shared/constants/routing.constant';

@Injectable()
export class NavigationService {

  constructor(
    private router: Router,
    private identityService: IdentityService,
  ) { }

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

  navHome() {
    this.router.navigateByUrl("/");
  }
  navOrder() {
    this.router.navigateByUrl("/order");
  }
  navContact() {
    this.router.navigateByUrl("/contact");
  }
  navDetail() {
    this.router.navigateByUrl("/detail");
  }

  navLogin() {
    this.router.navigateByUrl('/auth/login');
  }

  navMyProfile() {
    this.router.navigateByUrl(MODEL_ROUTING + '/user/detail');
  }

  navForgotPassword() {
    this.router.navigateByUrl('/auth/forgot-password');
  }

  // User page navigation for admin only
  navUserList() {
    if (this.identityService.isAdmin()) {
      this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.USER);
    } else {
      console.log('You are not authorized');
    }
  }

  //Category nav
  navCategoryList() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.CATEGORY);
  }

  //Item nav
  navItemList() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.ITEM);
  }

  //Material
  navMaterialList() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.MATERIAL);
  }

  //Material-daily-report
  navMaterialDailyReportList() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.MATERIAL_DAILY_REPORT);
  }
  navMaterialDailyReportCreate() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.MATERIAL_DAILY_REPORT + ROUTING_URL.CREATE);
  }

  //Order
  navOrderList() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.ORDER);
  }
  navOrderCreate() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.ORDER + ROUTING_URL.CREATE);
  }
  navOrderDetail(id: number) {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.ORDER + ROUTING_URL.DETAIL + id);
  }

  //Order-status
  navOrderStatusList() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.ORDER_STATUS);
  }

  //Quantity
  navQuantityList() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.QUANTITY);
  }

  //role
  navRoleList() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.ROLE);
  }

  //staff
  navStaffList() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.STAFF);
  }

  //store
  navStoreList() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.STORE);
  }

  //supply
  navSupplyList() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.SUPPLY);
  }

  //timekeeping
  navTimekeepingList() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.TIMEKEEPING);
  }
  navTimekeepingCreate() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.TIMEKEEPING + ROUTING_URL.CREATE);
  }

  //timekeeping-status
  navTimekeepingStatusList() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.TIMEKEEPING_STATUS);
  }

  //working-calender
  navWorkingCalenderList() {
    this.router.navigateByUrl(MODEL_ROUTING.MANAGEMENT + MODEL_ROUTING.WORKING_CALENDER);
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
