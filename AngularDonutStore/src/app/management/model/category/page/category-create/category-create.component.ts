import { CommonValidator } from './../../../../../shared/custom-validator/common.validator';
import { Subscription } from 'rxjs/Subscription';
import { NavigationService } from './../../../../../core/services/navigation.service';
import { CategoryService } from './../../service/category.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryValidator } from '../../../../../shared/custom-validator/category.validator';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if (this.subCategory)
      this.subCategory.unsubscribe();
  }
  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  formCategory: FormGroup;

  private subCategory: Subscription;
  constructor(
    private categoryService: CategoryService,
    private navigationService: NavigationService,
    private fb: FormBuilder
  ) {
    this.formCategory = fb.group({
      name: ['', [Validators.required, Validators.maxLength(255), CommonValidator.notEmpty], [CategoryValidator.shouldBeUnique(this.categoryService)]]
    })
  }

  ngOnInit() {
  }

  onCancel() {
    this.formCategory.reset();
  }
  onSubmit() {
    if (this.formCategory.valid) {
      const category = {
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
