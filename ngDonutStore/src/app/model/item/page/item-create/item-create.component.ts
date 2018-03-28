import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemService } from '../../service/item.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { ItemValidator } from '../../../../shared/custom-validator/item.validator';
import { Category } from '../../../category/category';

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

  formItem: FormGroup;

  private subItem: Subscription;
  constructor(
    private itemService: ItemService,
    private navigationService: NavigationService,
    private fb: FormBuilder
  ) {
    this.formItem = fb.group({
      name: ['', [Validators.required], [ItemValidator.shouldBeUnique(this.itemService)]],
      picture: ['', Validators.required],
      singleValue: ['', Validators.required],
      categoryId: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  onCancel() {
    this.formItem.reset();
  }
  onSubmit() {
    console.log(this.categoryId.value)
    if (this.formItem.valid) {
      const item = {
        name: this.name.value,
        picture: this.picture.value,
        singleValue: this.singleValue.value,
        categoryId: this.categoryId.value
      }
      this.subItem = this.itemService.save(item)
        .subscribe(response => {
          if (response.name === this.name.value) {
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

}
