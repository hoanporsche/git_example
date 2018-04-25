import { TimekeepingStatusService } from './../../management/model/timekeeping-status/service/timekeeping-status.service';
import { AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';

export class TimekeepingStatusValidator {

  static shouldBeUnique(timekeepingStatusService: TimekeepingStatusService) {
    return (control: AbstractControl) => {
      if(control.value.trim() !== '') {
        return timekeepingStatusService.findByName(control.value.trim())
          .map(response => {
            return (!response) ? null : { shouldBeUnique: true };
          });
      }
      
    };
  }

}