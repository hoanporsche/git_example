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
  private subListStore: Subscription;
  private subListItem: Subscription;

  formOrder: FormGroup;
  formArrayQuantites: FormArray;

  showFormShipping = false;

  @ViewChild("search")
  searchElementRef: ElementRef;

  origin = {
    lat: 0,
    lng: 0,
  }
  destination = {
    lat: 0,
    lng: 0,
  }
  dir = undefined;

  constants = {
    maxLength_text: 255,
    maxLength_number: 20
  }

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
      quantites: this.fb.array([])
    });
  }

  ngOnInit() {
    this.subListStore = this.mainService.findAllStore()
      .subscribe(response => {
        this.listStore = response;
        this.storeId.setValue(1);
      });
    this.subListItem = this.mainService.findAllItem()
      .subscribe(response => {
        this.listItem = response;
      });
  }

  showGgmaps() {
    const store = this.listStore.filter(o => o.id = +this.storeId.value)[0];
    this.origin.lat = +store.lat;
    this.origin.lng = +store.lng;
    this.destination.lat = +store.lat;
    this.destination.lng = +store.lng;
    // console.log(store);

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
        });
        this.dir = {
          origin: this.origin,
          destination: this.destination,
        }
        const origin = new google.maps.LatLng(this.origin.lat, this.origin.lng);
        const destination = new google.maps.LatLng(this.destination.lat, this.destination.lng);
        // let service = new google.maps.DistanceMatrixService;
        this.distance.setValue(google.maps.geometry.spherical.computeDistanceBetween(origin, destination));
        this.addressShipping.setValue($('#search-control').val());
      });
    });
  }

  storeIdValueChange() {
    console.log(this.showFormShipping)
    console.log("storeId =" , this.storeId.value)
    if (this.showFormShipping) {
      this.showGgmaps();
    }
  }

  isShippingValueChange() {
    if (this.isShipping.value === 'true') {
      this.showFormShipping = true;
      // this.showGgmaps();
    } else if (this.isShipping.value === 'false') {
      this.showFormShipping = false;
      this.addressShipping.setValue('');
      this.shippingPrice.setValue('');
      this.totalPrice.setValue(this.totalPrice.value - this.shippingPrice.value);
    }
  }
  
  onSubmit() {
    console.log(this.formOrder.value)
  }

  addSingleRowQuantity(item: Item) {
    return this.fb.group({
      id: [''],
      itemId: [item],
      orderId: [''],
      quantity: ['']
    });
  }

  addRowToForm(item) {
    this.formArrayQuantites = this.quantities as FormArray;
    this.formArrayQuantites.push(this.addSingleRowQuantity(item));
  }

  get quantities() {
    return this.formOrder.get('quantites');
  }

  ngOnDestroy(): void {
    if (this.subListStore)
      this.subListStore.unsubscribe();
    if (this.subListItem)
      this.subListItem.unsubscribe();
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
}
