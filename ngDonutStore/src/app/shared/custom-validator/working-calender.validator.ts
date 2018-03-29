import { WorkingCalenderService } from './../../model/working-calender/service/working-calender.service';
import { AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';

export class WorkingCalenderValidator {

  static shouldBeUnique(workingCalenderService: WorkingCalenderService) {
    return (control: AbstractControl) => {
      if(control.value) {
        return workingCalenderService.findByName(control.value)
          .map(response => {
            return (!response) ? null : { shouldBeUnique: true };
          });
      }
      
    };
  }

}