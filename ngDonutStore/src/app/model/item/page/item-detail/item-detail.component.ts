import { Category } from './../../../category/category';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Item } from '../../item';
import { ItemService } from '../../service/item.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { Material } from '../../../material/material';

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
      name: ['', Validators.required],
      picture: ['', Validators.required],
      singleValue: ['', Validators.required],
      categoryId: ['', Validators.required],
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
    this.itemService.findByName(this.name.value)
      .subscribe(response => {
        if (response && response.name != oldName)
          this.name.setErrors({ shouldBeUnique: true });
      }, error => {
        console.log(error)
      });
  }
  onSubmit() {
    console.log(this.formItem.value);
    if (this.formItem.valid) {
      const item = {
        id: this.oldItem.id,
        name: this.name.value,
        picture: this.picture.value,
        singleValue: this.singleValue.value,
        categoryId: this.categoryId.value,
        materials: this.materials.value,
      }
      this.subItem = this.itemService.save(item)
        .subscribe(response => {
          if (response.name === this.name.value) {
            this.submitted.emit('success');
          }
        }, error => {
          this.submitted.emit('fail');
        });
    }
  }

  onChangeItem() {
    this.materials.setValue(this.itemService.getItem().materials);
    this.categoryId.setValue(this.itemService.getItem().categoryId);
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
