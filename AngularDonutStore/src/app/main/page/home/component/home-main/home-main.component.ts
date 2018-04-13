import { MainService } from './../../../../layout-main/service-main/main-service.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../../../../management/model/category/category';
import { Item } from '../../../../../management/model/item/item';
import { ScriptLoaderService } from '../../../../../core/services/script-loader.service';
import { } from '@types/googlemaps';
import { Store } from '../../../../../management/model/store/store';

declare var $: any;
@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit, OnDestroy {

  listCategory: Category[];
  listItem: Item[];
  listStore: Store[];

  private subListCategory: Subscription;
  private subListItem: Subscription;
  private subListStore: Subscription;

  constructor(
    private mainService: MainService,
    private _script: ScriptLoaderService,
  ) {
   }

  ngOnInit() {
    this.subListCategory = this.mainService.findAllCategory()
      .subscribe(response => {
        this.listCategory = response;
      });
    this.subListItem = this.mainService.findAllItem()
      .subscribe(response => {
        this.listItem = response;
        if (this.listItem && this.listItem.length > 0 && this.listCategory) {
          for (let i = 0; i < this.listCategory.length; i++) {
            this.listCategory[i].items = this.listItem.filter(o => o.categoryId.id === this.listCategory[i].id);
          }
        }
      });
    this.subListStore = this.mainService.findAllStore()
      .subscribe(response => {
        this.listStore = response;
      });
  }

  ngOnDestroy(): void {
    if (this.subListCategory)
      this.subListCategory.unsubscribe();
    if (this.subListItem)
      this.subListItem.unsubscribe();
    if (this.subListStore)
      this.subListStore.unsubscribe();
  }
}
