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

  constructor(
    private mainService: MainService,
    private fb: FormBuilder,
  ) {
    this.formOrder = this.fb.group({
      nameCreated: ['', [Validators.required, CommonValidator.notEmpty]],
      dateUpdated: ['', [Validators.required, CommonValidator.notEmpty]],
      phone: ['', [Validators.required, CommonValidator.notEmpty]],
      storeId: ['', [Validators.required]],
      isShipping: ['', [Validators.required]],
      addressShipping: [''],
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
  }

  onSubmit() {
    
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
}
