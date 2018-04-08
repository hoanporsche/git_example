import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { OrderStatusService } from '../../service/order-status.service';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { OrderStatusValidator } from '../../../../../shared/custom-validator/order-status.validator';
import { CommonValidator } from '../../../../../shared/custom-validator/common.validator';

@Component({
  selector: 'app-order-status-create',
  templateUrl: './order-status-create.component.html',
  styleUrls: ['./order-status-create.component.css']
})
export class OrderStatusCreateComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if (this.subOrderStatus)
      this.subOrderStatus.unsubscribe();
  }
  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  formOrderStatus: FormGroup;

  private subOrderStatus: Subscription;
  constructor(
    private orderStatusService: OrderStatusService,
    private navigationService: NavigationService,
    private fb: FormBuilder
  ) {
    this.formOrderStatus = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty], [OrderStatusValidator.shouldBeUnique(this.orderStatusService)]],
      description: [''],
    })
  }

  ngOnInit() {
  }

  onCancel() {
    this.formOrderStatus.reset();
  }
  onSubmit() {
    if (this.formOrderStatus.valid) {
      const orderStatus = {
        name: this.name.value.trim(),
        description: this.description.value.trim()
      }
      this.subOrderStatus = this.orderStatusService.save(orderStatus)
        .subscribe(response => {
          if (response.name === this.name.value.trim()) {
            this.submitted.emit('success');
            this.formOrderStatus.reset();
          }
        }, error => {
          this.submitted.emit('fail');
        });
    }
  }

  get name() {
    return this.formOrderStatus.get('name');
  }

  get description() {
    return this.formOrderStatus.get('description');
  }
}
