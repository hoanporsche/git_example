import { Material } from './../../../material/material';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemService } from '../../service/item.service';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { ItemValidator } from '../../../../../shared/custom-validator/item.validator';
import { Category } from '../../../category/category';
import { CommonValidator } from '../../../../../shared/custom-validator/common.validator';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if (this.subItem)
      this.subItem.unsubscribe();
  }
  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  @Input() listCategory: Category[];

  @Input() listMaterial: Material[];

  formItem: FormGroup;

  private subItem: Subscription;
  constructor(
    private itemService: ItemService,
    private navigationService: NavigationService,
    private fb: FormBuilder
  ) {
    this.formItem = fb.group({
      name: ['', [Validators.required, Validators.maxLength(255), CommonValidator.notEmpty], [ItemValidator.shouldBeUnique(this.itemService)]],
      picture: ['', [Validators.required, CommonValidator.notEmpty]],
      singleValue: ['', [Validators.required, CommonValidator.notEmpty]],
      categoryId: ['', [Validators.required]],
      materials: [''],
    })
  }

  ngOnInit() {
  }

  onCancel() {
    this.formItem.reset();
  }
  onSubmit() {
    if (this.formItem.valid) {
      const item = {
        name: this.name.value.trim(),
        picture: this.picture.value.trim(),
        singleValue: this.singleValue.value.toString().trim(),
        categoryId: this.categoryId.value,
        materials: this.materials.value
      }
      console.log(item)
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
