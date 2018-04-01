import { Category } from './../../../category/category';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Item } from '../../item';
import { ItemService } from '../../service/item.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { Material } from '../../../material/material';
import { CommonValidator } from '../../../../shared/custom-validator/common.validator';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  @Input() oldItem: Item;

  @Input() listCategory: Category[];

  @Input() listMaterial: Material[];

  formItem: FormGroup;

  private subItem: Subscription;

  constructor(
    private fb: FormBuilder,
    public itemService: ItemService,
    private navigationService: NavigationService,
  ) {
    this.formItem = fb.group({
      name: ['', [Validators.required, Validators.maxLength(255), CommonValidator.notEmpty]],
      picture: ['', [Validators.required, Validators.maxLength(1000), CommonValidator.notEmpty]],
      singleValue: ['', [Validators.required, CommonValidator.notEmpty]],
      categoryId: ['', [Validators.required]],
      materials: [''],
    });
    this.materials.setValue(this.itemService.getItem().materials);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subItem)
      this.subItem.unsubscribe();
  }

  validateName() {
    const oldName = this.oldItem.name;
    if (this.name.value && this.name.value.trim() !== '') {
      this.itemService.findByName(this.name.value.trim())
        .subscribe(response => {
          if (response && response.name != oldName)
            this.name.setErrors({ shouldBeUnique: true });
        }, error => {
          console.log(error)
        });
    }
  }
  onSubmit() {
    if (this.formItem.valid) {
      const item = {
        id: this.oldItem.id,
        name: this.name.value.trim(),
        picture: this.picture.value.trim(),
        singleValue: this.singleValue.value.toString().trim(),
        categoryId: this.categoryId.value,
        materials: this.materials.value,
      }
      this.subItem = this.itemService.save(item)
        .subscribe(response => {
          if (response.name === this.name.value.trim()) {
            this.submitted.emit('success');
            this.formItem.reset();
          }
        }, error => {
          this.submitted.emit('fail');
        });
    }
  }

  onCancel() {
    this.formItem.reset();
  }

  get name() {
    return this.formItem.get('name');
  }

  get picture() {
    return this.formItem.get('picture');
  }

  get singleValue() {
    return this.formItem.get('singleValue');
  }

  get categoryId() {
    return this.formItem.get('categoryId');
  }

  get materials() {
    return this.formItem.get('materials');
  }
}
