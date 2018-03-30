import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { SupplyService } from '../../service/supply.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SupplyValidator } from '../../../../shared/custom-validator/supply.validator';
import { CommonValidator } from '../../../../shared/custom-validator/common.validator';

@Component({
  selector: 'app-supply-create',
  templateUrl: './supply-create.component.html',
  styleUrls: ['./supply-create.component.css']
})
export class SupplyCreateComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    if (this.subSupply)
      this.subSupply.unsubscribe();
  }
  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  formSupply: FormGroup;

  private subSupply: Subscription;
  constructor(
    private supplyService: SupplyService,
    private navigationService: NavigationService,
    private fb: FormBuilder
  ) {
    this.formSupply = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty], [SupplyValidator.shouldBeUnique(this.supplyService)]],
      phone: ['', [Validators.required, CommonValidator.notEmpty]],
      address: ['', [Validators.required, CommonValidator.notEmpty]],
    })
  }

  ngOnInit() {
  }

  onCancel() {
    this.formSupply.reset();
  }
  onSubmit() {
    if (this.formSupply.valid) {
      const supply = {
        name: this.name.value.trim(),
        phone: this.phone.value.trim(),
        address: this.address.value.trim()
      }
      this.subSupply = this.supplyService.save(supply)
        .subscribe(response => {
          if (response.name === this.name.value.trim()) {
            this.submitted.emit('success');
            this.formSupply.reset();
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
