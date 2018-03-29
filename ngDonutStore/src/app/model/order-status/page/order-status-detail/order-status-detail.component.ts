import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { OrderStatus } from '../../order-status';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { OrderStatusService } from '../../service/order-status.service';
import { NavigationService } from '../../../../core/services/navigation.service';

@Component({
  selector: 'app-order-status-detail',
  templateUrl: './order-status-detail.component.html',
  styleUrls: ['./order-status-detail.component.css']
})
export class OrderStatusDetailComponent implements OnInit, OnDestroy {

  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  @Input() oldOrderStatus: OrderStatus;

  formOrderStatus: FormGroup;

  private subOrderStatus: Subscription;
  
  constructor(
    private fb: FormBuilder,
    public orderStatusService: OrderStatusService,
    private navigationService: NavigationService,
  ) { 
    this.formOrderStatus = fb.group({
      name: ['', Validators.required],
      description: [''],
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subOrderStatus)
      this.subOrderStatus.unsubscribe();
  }

  validateName() {
    const oldName = this.oldOrderStatus.name;
    this.orderStatusService.findByName(this.name.value)
      .subscribe(response => {
        if (response && response.name != oldName) 
          this.name.setErrors({shouldBeUnique: true});
      }, error => {
        console.log(error)
      });
  }
  onSubmit() {
    if (this.formOrderStatus.valid) {
      const orderStatus = {
        id: this.oldOrderStatus.id,
        name: this.name.value,
        description: this.description.value
      }
      this.subOrderStatus = this.orderStatusService.save(orderStatus)
        .subscribe(response => {
          if (response.name === this.name.value) {
            this.submitted.emit('success');
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
