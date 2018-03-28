import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { SupplyService } from '../../service/supply.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { SupplyValidator } from '../../../../shared/custom-validator/supply.validator';

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
      name: ['', [Validators.required], [SupplyValidator.shouldBeUnique(this.supplyService)]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
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
        name: this.name.value,
        phone: this.phone.value,
        address: this.address.value
      }
      this.subSupply = this.supplyService.save(supply)
        .subscribe(response => {
          if (response.name === this.name.value) {
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
