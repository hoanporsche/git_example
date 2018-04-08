import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Supply } from '../../../supply/supply';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MaterialService } from '../../service/material.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { MaterialValidator } from '../../../../shared/custom-validator/material.vaildator';
import { CommonValidator } from '../../../../shared/custom-validator/common.validator';

@Component({
  selector: 'app-material-create',
  templateUrl: './material-create.component.html',
  styleUrls: ['./material-create.component.css']
})
export class MaterialCreateComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if (this.subMaterial)
      this.subMaterial.unsubscribe();
  }
  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  @Input() listSupply: Supply[];

  formMaterial: FormGroup;

  private subMaterial: Subscription;
  constructor(
    private materialService: MaterialService,
    private navigationService: NavigationService,
    private fb: FormBuilder
  ) {
    this.formMaterial = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty], [MaterialValidator.shouldBeUnique(this.materialService)]],
      picture: ['', [Validators.required, CommonValidator.notEmpty]],
      singleValue: ['', [Validators.required, CommonValidator.notEmpty]],
      supplyId: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  onCancel() {
    this.formMaterial.reset();
  }
  onSubmit() {
    if (this.formMaterial.valid) {
      const material = {
        name: this.name.value.trim(),
        picture: this.picture.value.trim(),
        singleValue: this.singleValue.value.toString().trim(),
        supplyId: this.supplyId.value
      }
      this.subMaterial = this.materialService.save(material)
        .subscribe(response => {
          if (response.name === this.name.value.trim()) {
            this.submitted.emit('success');
            this.formMaterial.reset();
          }
        }, error => {
          this.submitted.emit('fail');
        });
    }
  }

  get name() {
    return this.formMaterial.get('name');
  }

  get picture() {
    return this.formMaterial.get('picture');
  }

  get singleValue() {
    return this.formMaterial.get('singleValue');
  }

  get supplyId() {
    return this.formMaterial.get('supplyId');
  }

}
