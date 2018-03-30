import { StoreService } from './../../model/store/service/store.service';
import { AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';

export class StoreValidator {

  static shouldBeUnique(storeService: StoreService) {
    return (control: AbstractControl) => {
      if(control.value.trim() !== '') {
        return storeService.findByName(control.value.trim())
          .map(response => {
            return (!response) ? null : { shouldBeUnique: true };
          });
      }
      
    };
  }

}