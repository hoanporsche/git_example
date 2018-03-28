import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Material } from '../../material';
import { Supply } from '../../../supply/supply';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MaterialService } from '../../service/material.service';
import { NavigationService } from '../../../../core/services/navigation.service';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.css']
})
export class MaterialDetailComponent implements OnInit, OnDestroy {

  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  @Input() oldMaterial: Material;

  @Input() listSupply: Supply[];

  formMaterial: FormGroup;

  private subMaterial: Subscription;

  constructor(
    private fb: FormBuilder,
    public materialService: MaterialService,
    private navigationService: NavigationService,
  ) {
    this.formMaterial = fb.group({
      name: ['', Validators.required],
      picture: ['', Validators.required],
      singleValue: ['', Validators.required],
      supplyId: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subMaterial)
      this.subMaterial.unsubscribe();
  }

  validateName() {
    const oldName = this.oldMaterial.name;
    this.materialService.findByName(this.name.value)
      .subscribe(response => {
        if (response && response.name != oldName)
          this.name.setErrors({ shouldBeUnique: true });
      }, error => {
        console.log(error)
      });
  }
  onSubmit() {
    if (this.formMaterial.valid) {
      const material = {
        id: this.oldMaterial.id,
        name: this.name.value,
        picture: this.picture.value,
        singleValue: this.singleValue.value,
        supplyId: this.supplyId.value
      }
      this.subMaterial = this.materialService.save(material)
        .subscribe(response => {
          if (response.name === this.name.value) {
            this.submitted.emit('success');
          }
        }, error => {
          this.submitted.emit('fail');
        });
    }
  }

  onChangeMaterial() {
    console.log(this.name.value)
    this.supplyId.setValue(this.materialService.getMaterial().supplyId);
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
