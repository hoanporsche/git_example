import { MaterialService } from './../../model/material/service/material.service';
import { AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';

export class MaterialValidator {

  static shouldBeUnique(materialService: MaterialService) {
    return (control: AbstractControl) => {
      if(control.value) {
        return materialService.findByName(control.value)
          .map(response => {
            return (!response) ? null : { shouldBeUnique: true };
          });
      }
      
    };
  }

}