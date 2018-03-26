import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'item',
  template: '<router-outlet></router-outlet>',
})
export class ItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}