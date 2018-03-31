import { SupplyService } from './../../model/supply/service/supply.service';
import { AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';

export class SupplyValidator {

  static shouldBeUnique(supplyService: SupplyService) {
    return (control: AbstractControl) => {
      if(control.value.trim() !== '') {
        return supplyService.findByName(control.value.trim())
          .map(response => {
            return (!response) ? null : { shouldBeUnique: true };
          });
      }
      
    };
  }

}