import { MainService } from './../../../../layout-main/service-main/main-service.service';
import { Subscription } from 'rxjs/Subscription';
import { ItemService } from './../../../../../management/model/item/service/item.service';
import { CategoryService } from './../../../../../management/model/category/service/category.service';
import { Component, OnInit, OnDestroy, AfterViewInit, Inject, ElementRef } from '@angular/core';
import { Category } from '../../../../../management/model/category/category';
import { Item } from '../../../../../management/model/item/item';
import { ScriptLoaderService } from '../../../../../core/services/script-loader.service';
import { DOCUMENT } from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit, OnDestroy, AfterViewInit {

  listCategory: Category[];
  listItem: Item[];

  private subListCategory: Subscription;
  private subListItem: Subscription;

  constructor(
    private mainService: MainService,
    private _script: ScriptLoaderService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.subListCategory = this.mainService.findAllCategory()
      .subscribe(response => {
        this.listCategory = response;
      });
    this.subListItem = this.mainService.findAllItem()
      .subscribe(response => {
        this.listItem = response;
        if (this.listItem.length > 0 && this.listCategory) {
          for (let i = 0; i < this.listCategory.length; i++) {
            this.listCategory[i].items = this.listItem.filter(o => o.categoryId.id === this.listCategory[i].id);
          }
        }
      });
      // var s = window.document.createElement("script");
      // s.type = "text/javascript";
      // s.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyAg44sIHbBu2Ex5DLSvMRFL4SVBr6qDuwM";
      // this.elementRef.nativeElement.appendChild(s);
  }

  ngOnDestroy(): void {
    if (this.subListCategory)
      this.subListCategory.unsubscribe();
    if (this.subListItem)
      this.subListItem.unsubscribe();
  }
  ngAfterViewInit(): void {
    this._script.load('app-home-main',
      'assets/donut-store-js/home-main.js');
  }
}
