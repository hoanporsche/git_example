import { Category } from './../../../../../management/model/category/category';
import { Item } from './../../../../../management/model/item/item';
import { MainService } from './../../../../layout-main/service-main/main-service.service';
import { CommonValidator } from './../../../../../shared/custom-validator/common.validator';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild, NgZone, ElementRef } from '@angular/core';
import { Store } from '../../../../../management/model/store/store';
import { Subscription } from 'rxjs/Subscription';
import { } from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';

declare var $: any;
@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit, OnDestroy {

  listStore: Store[];
  listItem: Item[];
  listCategory: Category[];
  private subListStore: Subscription;
  private subListItem: Subscription;
  private subListCategory: Subscription;

  formOrder: FormGroup;
  formArrayQuantites: FormArray;

  showFormShipping = false;
  isShowGgmaps = false;

  @ViewChild("search")
  searchElementRef: ElementRef;
  content: ElementRef;

  origin = {
    lat: 0,
    lng: 0,
  }
  destination = {
    lat: 0,
    lng: 0,
  }
  dir = undefined;
  visible = true;

  constants = {
    maxLength_text: 255,
    maxLength_number: 20
  }
  searchControl: FormControl;

  constructor(
    private mainService: MainService,
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {
    this.formOrder = this.fb.group({
      nameCreated: ['', [Validators.required, CommonValidator.notEmpty]],
      dateUpdated: ['', [Validators.required, CommonValidator.notEmpty]],
      phone: ['', [Validators.required, CommonValidator.notEmpty]],
      storeId: ['', [Validators.required]],
      isShipping: ['false', [Validators.required]],
      addressShipping: [''],
      distance: [''],
      shippingPrice: [''],
      totalPrice: [''],
      quantites: this.fb.array([]),
      searchControl: ['']
    });
  }

  ngOnInit() {
    this.subListStore = this.mainService.findAllStore()
      .subscribe(response => {
        this.listStore = response;
        this.storeId.setValue(1);
        this.showGgmaps();
      });
    this.subListItem = this.mainService.findAllItem()
      .subscribe(response => {
        this.listItem = response;
      });
    this.subListCategory = this.mainService.findAllCategory()
      .subscribe(response => {
        this.listCategory = response;
      });
  }

  showGgmaps() {
    const store = this.findStoreById(this.storeId.value);
    this.origin.lat = +store.lat;
    this.origin.lng = +store.lng;
    this.destination.lat = +store.lat;
    this.destination.lng = +store.lng;

    this.searchControl = new FormControl();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.destination.lat = place.geometry.location.lat();
          this.destination.lng = place.geometry.location.lng();
          this.dir = {
            origin: this.origin,
            destination: this.destination,
          }
          const origin = new google.maps.LatLng(this.origin.lat, this.origin.lng);
          const destination = new google.maps.LatLng(this.destination.lat, this.destination.lng);
          /**
           * if user chooses to ship their stuffs, we will calculate shipping price
           */
          if (this.isShipping.value === 'true') {
            // let service = new google.maps.DistanceMatrixService;
            const distance = +((google.maps.geometry.spherical.computeDistanceBetween(origin, destination) / 1000) + 0.1).toString().substring(0, 3);
            this.distance.setValue(distance);
            if (distance < 4) {
              this.shippingPrice.setValue("12000");
            } else {
              this.shippingPrice.setValue(distance * 5500 - 12000);
            }
            this.addressShipping.setValue($('#search-control').val());
          }
        });
      });
    });
  }
  
  get formData() { 
    return <FormArray>this.formOrder.get('quantites'); 
  }

  /**
   * catch event when change address
   * we will re-route/re-render with new direction on GGMaps
   */
  onChangeAddress() {
    setTimeout(() => {
      this.visible = true;
    }, 500);
    this.visible = false;
  }
  /**
   * catch event when user change target store
   * if user is choosing to ship their stuffs, we will reset GGMaps and 3 fileds
   * shippingPrice + distance + totalPrice
   */
  onChangeStoreId() {
    this.searchElementRef = this.content;
    this.showGgmaps();
    if (this.visible) {
      this.visible = false;
      // this.addressShipping.setValue('');
      this.shippingPrice.setValue('');
      this.distance.setValue('');
      this.totalPrice.setValue(this.totalPrice.value - this.shippingPrice.value);
    }
  }
  /**
   * catch event when change isShipping field
   * if user changes a kind of receving stuffs
   * we show or not GGMaps
   */
  onChangeIsShipping() {
    if (this.isShipping.value === 'true') {
      this.showFormShipping = true;
    } else if (this.isShipping.value === 'false') {
      this.showFormShipping = false;
      this.distance.setValue('');
      this.addressShipping.setValue('');
      this.totalPrice.setValue(this.totalPrice.value - this.shippingPrice.value);
      this.shippingPrice.setValue('');
    }
  }
  /**
   * find a store to show a marker of found store on GGMaps
   * @param storeId 
   */
  findStoreById(storeId: number): Store {
    for (let i = 0; i < this.listStore.length; i++) {
      if (this.listStore[i].id === +storeId)
        return this.listStore[i];
    }
  }
  /**
   * add one row that corresponding item in view
   * @param event 
   * @param item 
   */
  onChooseItem(event, item) {
    if (event.target.checked) {
      this.addRowToForm(item);
    } else {
      this.deleteSingleRowQuantity(item);
    }
    this.onCaculateTotalPrice();
  }
  onCaculateTotalPrice() {
    let totalPrice = 0;
    this.formArrayQuantites = this.quantities as FormArray;
    for (let i = 0; i < this.formArrayQuantites.length; i++) {
      totalPrice = +totalPrice + (
        +this.formArrayQuantites.controls[i].get('itemId').value.singleValue * +this.formArrayQuantites.controls[i].get('quantity').value
      );
    }
    totalPrice = +totalPrice + +this.shippingPrice.value;
    this.totalPrice.setValue(totalPrice);
  }

  onSubmit() {
    console.log(this.formOrder.value)
  }

  addSingleRowQuantity(item: Item) {
    return this.fb.group({
      id: [''],
      itemId: [item],
      orderId: [''],
      quantity: ['',[Validators.required, CommonValidator.notEmpty]]
    });
  }

  deleteSingleRowQuantity(item: Item) {
    this.formArrayQuantites = this.quantities as FormArray;
    for (let i = 0; i < this.formArrayQuantites.length; i++) {
      if (this.formArrayQuantites.controls[i].get('itemId').value.id === item.id) {
        this.formArrayQuantites.removeAt(i);
      }
    }
  }

  addRowToForm(item) {
    this.formArrayQuantites = this.quantities as FormArray;
    this.formArrayQuantites.push(this.addSingleRowQuantity(item));
  }

  ngOnDestroy(): void {
    if (this.subListStore)
      this.subListStore.unsubscribe();
    if (this.subListItem)
      this.subListItem.unsubscribe();
    if (this.subListCategory)
      this.subListCategory.unsubscribe();
  }

  get nameCreated() {
    return this.formOrder.get('nameCreated');
  }

  get dateUpdated() {
    return this.formOrder.get('dateUpdated');
  }

  get phone() {
    return this.formOrder.get('phone');
  }

  get storeId() {
    return this.formOrder.get('storeId');
  }

  get isShipping() {
    return this.formOrder.get('isShipping');
  }

  get addressShipping() {
    return this.formOrder.get('addressShipping');
  }

  get distance() {
    return this.formOrder.get('distance');
  }

  get shippingPrice() {
    return this.formOrder.get('shippingPrice');
  }

  get totalPrice() {
    return this.formOrder.get('totalPrice');
  }

  get quantities() {
    return this.formOrder.get('quantites');
  }
}
