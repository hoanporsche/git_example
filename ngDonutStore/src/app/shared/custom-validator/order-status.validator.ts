import { OrderStatusService } from './../../model/order-status/service/order-status.service';
import { AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';

export class OrderStatusValidator {

  static shouldBeUnique(orderStatusService: OrderStatusService) {
    return (control: AbstractControl) => {
      if(control.value) {
        return orderStatusService.findByName(control.value)
          .map(response => {
            return (!response) ? null : { shouldBeUnique: true };
          });
      }
      
    };
  }

}