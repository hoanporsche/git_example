import { NavigationService } from './../../../core/services/navigation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
  }

  navLogin() {
    this.navigationService.navLogin();
  }

}
