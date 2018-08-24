import { Item } from './../../../management/model/item/item';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit {

  @Input('item') item: Item;
  constructor() { }

  ngOnInit() {
  }

}
