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
    // if (this.identityService.isDuLead()) {
    //   return '/du-lead';
    // } else if (this.identityService.isDuMember()) {
    //   return '/du-member';      
    // } else if (this.identityService.isHrManager()) {
    //   return '/hr-manager';      
    // } else if (this.identityService.isHrMember()) {
    //   return '/hr-member';      
    // } else if (this.identityService.isAdmin()) {
    //   return '/admin';
    // } else {
    //   this.navLogin();
    // } 
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
    // if(this.identityService.isAdmin()) {
    //   this.navUserList();
    // } else if (this.identityService.isDuLead()) {
    //   this.navRequestList();
    // } else if (this.identityService.isDuMember()) {
    //   this.navRequestList();      
    // } else if (this.identityService.isHrManager()) {
    //   this.navRequestHomeHrManager();      
    // } else if (this.identityService.isHrMember()) {
    //   this.navRequestHomeHrManager();  
    // } else {
    //   this.navLogin();
    // } 
    if(this.identityService.isAdmin()) {
      this.navUserList();
    } else if (this.identityService.isAdmin()) {
      this.navRequestList();
    } else if (this.identityService.isStaff()) {
      this.navRequestList();      
    } else if (this.identityService.isStore()) {
      this.navRequestHomeHrManager();       
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

  // Request page navigations
  navRequestHomeHrManager() {
    this.router.navigateByUrl(this.getRoleSegment() + '/request/approved');
  }
  navRequestList() {
      this.router.navigateByUrl(this.getRoleSegment() + '/request');
  }
  navRequestCreate() {
    this.router.navigateByUrl(this.getRoleSegment() + '/request/create');
  }
  navRequestDetail(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/request/' + id);    
  }
  navForgotPassword() {
    this.router.navigateByUrl('/auth/forgot-password');
  }

  // User page navigation for admin only
  navUserList() {
    if (this.identityService.isAdmin()) {
      this.router.navigateByUrl('/admin/user');
    } else {
      console.log('You are not authorized');
    }
  }
  navUserCreate() {
    if (this.identityService.isAdmin()) {
      this.router.navigateByUrl('/admin/user/create');
    } else {
      console.log('You are not authorized');
    }
  }
  navUserUpdate(id: number) {
    if (this.identityService.isAdmin()) {
      this.router.navigateByUrl('/admin/user/' + id + '/update');
    } else {
      console.log('You are not authorized');
    }
  }
  navUserDetail(id: number) {
    if (this.identityService.isAdmin()) {
      this.router.navigateByUrl('/admin/user/' + id);
    } else {
      console.log('You are not authorized');
    }
  }

  // Cv page navigations
  navCvList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/cv');    
  }
  navCvDetail(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/cv/' + id);        
  }
  navCvCreate() {
    this.router.navigateByUrl(this.getRoleSegment() + '/cv/create');        
  }
  navCvUpdate(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/cv/' + id + '/update');        
  }

  // Candidate page navigation
  navCandidateList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/candidate');
  }
  navCandidateCreate() {
    this.router.navigateByUrl(this.getRoleSegment() + '/candidate/create');
  }
  navCandidateDetail(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/candidate/detail/' + id);
  }
  navCandidateUpdate(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/candidate/' + id + '/update');
  }

  // Inteview page navigation
  navInterviewList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/interview');        
  }
  navInterviewCreate() {
    this.router.navigateByUrl(this.getRoleSegment() + '/interview/create');        
  }
  navInterviewDetail(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/interview/detail/' + id);        
  }
  navInterviewUpdate(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/interview/' + id + '/update');        
  }
  navInterviewCreateWithCandidate(id) {
    this.router.navigateByUrl(this.getRoleSegment() + '/interview/create?candidateId=' + id);        
  }

  // Report page navigation
  navReportList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/report');            
  }
  navReportCreate() {
    this.router.navigateByUrl(this.getRoleSegment() + '/report/create');            
  }
  navReportDetail(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/report/' + id);
  }
  navReportUpdate(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/report/' + id + '/update');
  }

  // Department page navigation
  navDepartmentList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/department');
  }
  navDepartmentCreate() {
    this.router.navigateByUrl(this.getRoleSegment() + '/department/create');
  }
  navDepartmentDetail(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/department/' + id);
  }
  navDepartmentUpdate(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/department/' + id + '/update');
  }

  // Position page navigation
  navPositionList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/position');
  }
  navPositionCreate() {
    this.router.navigateByUrl(this.getRoleSegment() + '/position/create');
  }
  navPositionDetail(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/position/' + id);
  }
  navPositionUpdate(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/position/' + id + '/update');
  }

  // Skill page navigation
  navSkillList() {
    this.router.navigateByUrl(this.getRoleSegment() + '/skill');    
  }
  navSkillCreate() {
    this.router.navigateByUrl(this.getRoleSegment() + '/skill/create');    
  }
  navSkillDetail(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/skill/' +id);
  }
  navSkillUpdate(id: number) {
    this.router.navigateByUrl(this.getRoleSegment() + '/skill/' +id + '/update');
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
  
  navListCandidateByRequestId(id) {
    this.router.navigateByUrl(this.getRoleSegment() + '/candidate/list/request/'+id);
  }

  navListCandidateByRequestIdAndStatusId(requestId, statusId) {
    this.router.navigateByUrl(this.getRoleSegment() + '/candidate/list/request/'+ requestId + '/' + statusId);
  }
}
