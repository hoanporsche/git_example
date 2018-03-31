import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Supply } from '../../supply';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { SupplyService } from '../../service/supply.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { CommonValidator } from '../../../../shared/custom-validator/common.validator';

@Component({
  selector: 'app-supply-detail',
  templateUrl: './supply-detail.component.html',
  styleUrls: ['./supply-detail.component.css']
})
export class SupplyDetailComponent implements OnInit, OnDestroy {

  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  @Input() oldSupply: Supply;

  formSupply: FormGroup;

  private subSupply: Subscription;

  constructor(
    private fb: FormBuilder,
    public supplyService: SupplyService,
    private navigationService: NavigationService,
  ) {
    this.formSupply = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty]],
      phone: ['', [Validators.required, CommonValidator.notEmpty]],
      address: ['', [Validators.required, CommonValidator.notEmpty]],
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subSupply)
      this.subSupply.unsubscribe();
  }

  validateName() {
    const oldName = this.oldSupply.name;
    if (this.name.value.trim() !== '') {
      this.supplyService.findByName(this.name.value.trim())
        .subscribe(response => {
          if (response && response.name != oldName)
            this.name.setErrors({ shouldBeUnique: true });
        }, error => {
          console.log(error)
        });
    }
  }
  onSubmit() {
    if (this.formSupply.valid) {
      const supply = {
        id: this.oldSupply.id,
        name: this.name.value.trim(),
        phone: this.phone.value.trim(),
        address: this.address.value.trim()
      }
      this.subSupply = this.supplyService.save(supply)
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
    return this.formSupply.get('name');
  }

  get phone() {
    return this.formSupply.get('phone');
  }

  get address() {
    return this.formSupply.get('address');
  }
}
