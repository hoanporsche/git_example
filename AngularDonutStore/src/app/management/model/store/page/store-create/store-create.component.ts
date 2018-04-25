import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { StoreService } from '../../service/store.service';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { CommonValidator } from '../../../../../shared/custom-validator/common.validator';
import { StoreValidator } from '../../../../../shared/custom-validator/store.validator';

@Component({
  selector: 'app-store-create',
  templateUrl: './store-create.component.html',
  styleUrls: ['./store-create.component.css']
})
export class StoreCreateComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if (this.subStore)
      this.subStore.unsubscribe();
  }
  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  formStore: FormGroup;

  private subStore: Subscription;
  constructor(
    private storeService: StoreService,
    private navigationService: NavigationService,
    private fb: FormBuilder
  ) {
    this.formStore = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty], [StoreValidator.shouldBeUnique(this.storeService)]],
      phone: ['', [Validators.required, CommonValidator.notEmpty]],
      picture: ['', [Validators.required, CommonValidator.notEmpty]],
      address: ['', [Validators.required, CommonValidator.notEmpty]],
      lat: [''],
      lng: [''],
    })
  }

  ngOnInit() {
  }

  onCancel() {
    this.formStore.reset();
  }
  onSubmit() {
    if (this.formStore.valid) {
      const store = {
        name: this.name.value.trim(),
        phone: this.phone.value.trim(),
        picture: this.picture.value.trim(),
        address: this.address.value.trim(),
        lat: this.lat.value.trim(),
        lng: this.lng.value.trim(),
      }
      this.subStore = this.storeService.save(store)
        .subscribe(response => {
          if (response.name === this.name.value.trim()) {
            this.submitted.emit('success');
            this.formStore.reset();
          }
        }, error => {
          this.submitted.emit('fail');
        });
    }
  }

  get name() {
    return this.formStore.get('name');
  }

  get picture() {
    return this.formStore.get('picture');
  }

  get phone() {
    return this.formStore.get('phone');
  }

  get address() {
    return this.formStore.get('address');
  }

  get lat() {
    return this.formStore.get('lat');
  }

  get lng() {
    return this.formStore.get('lng');
  }

}
