import { Category } from './../../category';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { Subscription } from 'rxjs/Subscription';
import { CommonValidator } from '../../../../../shared/custom-validator/common.validator';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  @Input() oldCategory: Category;

  formCategory: FormGroup;

  private subCategory: Subscription;

  constructor(
    private fb: FormBuilder,
    public categoryService: CategoryService,
    private navigationService: NavigationService,
  ) {
    this.formCategory = fb.group({
      name: ['', [Validators.required, Validators.maxLength(255), CommonValidator.notEmpty]]
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subCategory)
      this.subCategory.unsubscribe();
  }

  validateName() {
    const oldName = this.oldCategory.name;
    if (this.name.value && this.name.value.trim() !== '') {
      this.categoryService.findByName(this.name.value.trim())
        .subscribe(response => {
          if (response && response.name != oldName)
            this.name.setErrors({ shouldBeUnique: true });
        }, error => {
          console.log(error)
        });
    }
  }
  onSubmit() {
    if (this.formCategory.valid) {
      const category = {
        id: this.oldCategory.id,
        name: this.name.value.trim()
      }
      this.subCategory = this.categoryService.save(category)
        .subscribe(response => {
          if (response.name === this.name.value.trim()) {
            this.submitted.emit('success');
            this.formCategory.reset();
          }
        }, error => {
          this.submitted.emit('fail');
        });
    }
  }

  get name() {
    return this.formCategory.get('name');
  }
}
