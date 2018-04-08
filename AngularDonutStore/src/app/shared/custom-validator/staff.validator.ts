import { StaffService } from './../../management/model/staff/service/staff.service';
import { AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';

export class StaffValidator {

  static shouldBeUnique(staffService: StaffService) {
    return (control: AbstractControl) => {
      if(control.value.toString().trim() !== '') {
        return staffService.findByIdentityCard(control.value.toString().trim())
          .map(response => {
            return (!response) ? null : { shouldBeUnique: true };
          });
      }
      
    };
  }

}