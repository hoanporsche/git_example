import { StaffService } from './../../model/staff/service/staff.service';
import { AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';

export class StaffValidator {

  static shouldBeUnique(staffService: StaffService) {
    return (control: AbstractControl) => {
      if(control.value.trim() !== '') {
        return staffService.findByName(control.value.trim())
          .map(response => {
            return (!response) ? null : { shouldBeUnique: true };
          });
      }
      
    };
  }

}