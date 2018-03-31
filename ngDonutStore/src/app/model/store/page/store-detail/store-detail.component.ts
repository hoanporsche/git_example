import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '../../store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { StoreService } from '../../service/store.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { CommonValidator } from '../../../../shared/custom-validator/common.validator';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit, OnDestroy {

  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  @Input() oldStore: Store;

  formStore: FormGroup;

  private subStore: Subscription;

  constructor(
    private fb: FormBuilder,
    public storeService: StoreService,
    private navigationService: NavigationService,
  ) {
    this.formStore = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty]],
      picture: ['', [Validators.required, CommonValidator.notEmpty]],
      phone: ['', [Validators.required, CommonValidator.notEmpty]],
      address: ['', [Validators.required, CommonValidator.notEmpty]],
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subStore)
      this.subStore.unsubscribe();
  }

  validateName() {
    const oldName = this.oldStore.name;
    if (this.name.value.trim() !== '') {
      this.storeService.findByName(this.name.value.trim())
        .subscribe(response => {
          if (response && response.name != oldName)
            this.name.setErrors({ shouldBeUnique: true });
        }, error => {
          console.log(error)
        });
    }
  }
  onSubmit() {
    if (this.formStore.valid) {
      const store = {
        id: this.oldStore.id,
        name: this.name.value.trim(),
        picture: this.picture.value.trim(),
        phone: this.phone.value.trim(),
        address: this.address.value.trim()
      }
      this.subStore = this.storeService.save(store)
        .subscribe(response => {
          if (response.name === this.name.value.trim()) {
            this.submitted.emit('success');
          }
        }, error => {
          this.submitted.emit('fail');
        });
    }
  }

  get name() {
    return this.formStore.get('name');
  }

  get phone() {
    return this.formStore.get('phone');
  }

  get address() {
    return this.formStore.get('address');
  }
  
  get picture() {
    return this.formStore.get('picture');
  }

}
