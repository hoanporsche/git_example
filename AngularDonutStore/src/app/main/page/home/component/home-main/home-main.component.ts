import { MainService } from './../../../../layout-main/service-main/main-service.service';
import { Subscription } from 'rxjs/Subscription';
import { ItemService } from './../../../../../management/model/item/service/item.service';
import { CategoryService } from './../../../../../management/model/category/service/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../../../../management/model/category/category';
import { Item } from '../../../../../management/model/item/item';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit, OnDestroy {

  listCategory: Category[];
  listItem: Item[];

  private subListCategory: Subscription;
  private subListItem: Subscription;

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.subListCategory = this.mainService.findAllCategory()
      .subscribe(response => {
        this.listCategory = response;
      });
    this.subListItem = this.mainService.findAllItem()
      .subscribe(response => {
        this.listItem = response;
      });
  }

  ngOnDestroy(): void {
    if (this.subListCategory)
      this.subListCategory.unsubscribe();
    if (this.subListItem)
      this.subListItem.unsubscribe();
  }
}
