import { Item } from './../../../../../management/model/item/item';
import { MainService } from './../../../../layout-main/service-main/main-service.service';
import { CommonValidator } from './../../../../../shared/custom-validator/common.validator';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '../../../../../management/model/store/store';
import { Subscription } from 'rxjs/Subscription';

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

  constructor(
    private mainService: MainService,
    private fb: FormBuilder,
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
      });
    this.subListItem = this.mainService.findAllItem()
      .subscribe(response => {
        this.listItem = response;
      });
      this.showGgmaps();
  }

  showGgmaps() {
    const store = this.listStore.filter(o => o.id = +this.storeId.value)[0];
    const latlng = new google.maps.LatLng(+store.lat, +store.lng);
    const myOptions = {
      zoom: 14,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    const map = new google.maps.Map(document.getElementById("show_ggmaps"), myOptions);
    const marker1 = new google.maps.Marker({
      position: latlng,
      map: map,
      //icon:"banhran.jpg", đây là icon cho marker
      title: store.name
    });
    
  }

  isShippingValueChange() {
    if (this.isShipping.value === 'true') {
      this.showFormShipping = true;
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
