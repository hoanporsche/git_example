import { MainService } from './../../../../layout-main/service-main/main-service.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, AfterViewInit, Inject, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Category } from '../../../../../management/model/category/category';
import { Item } from '../../../../../management/model/item/item';
import { ScriptLoaderService } from '../../../../../core/services/script-loader.service';
import { } from '@types/googlemaps';
import { Store } from '../../../../../management/model/store/store';
import { MapsAPILoader } from '@agm/core';

declare var $: any;
@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit, OnDestroy, AfterViewInit {

  listCategory: Category[];
  listItem: Item[];
  listStore: Store[];

  private subListCategory: Subscription;
  private subListItem: Subscription;
  private subListStore: Subscription;

  latlng: google.maps.LatLng[];

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  constructor(
    private mainService: MainService,
    private _script: ScriptLoaderService,
    private elementRef: ElementRef,
    private mapsAPITLoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.latlng = [];
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
        if (response) {
          for (let i = 0; i < this.listStore.length; i++) {
            this.latlng.push(new google.maps.LatLng(+this.listStore[i].lat, +this.listStore[i].lng));
          }
          if (this.latlng.length > 0) {
            var myOptions = {
              zoom: 12,
              center: this.latlng[0],
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(document.getElementById("show_ggmaps"),myOptions);
            for (let i = 0; i < this.latlng.length; i++) {
              const marker = new google.maps.Marker({
                position: this.latlng[i],
                map: map,
                title: this.listStore[i].name
              });
            }
          }
        }
      });
  }

  ngAfterViewInit(): void {
    // this._script.load('app-home-main',
    //   'assets/donut-store-js/home-main.js');
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
