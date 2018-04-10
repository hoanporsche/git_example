import { NavigationService } from './../../../core/services/navigation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent implements OnInit {

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
  }

  navLogin() {
    this.navigationService.navLogin();
  }

}
