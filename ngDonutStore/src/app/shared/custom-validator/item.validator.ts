import { ItemService } from './../../model/item/service/item.service';
import { AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';

export class ItemValidator {

  static shouldBeUnique(itemService: ItemService) {
    return (control: AbstractControl) => {
      if(control.value.trim() !== '') {
        return itemService.findByName(control.value.trim())
          .map(response => {
            return (!response) ? null : { shouldBeUnique: true };
          });
      }
      
    };
  }

}