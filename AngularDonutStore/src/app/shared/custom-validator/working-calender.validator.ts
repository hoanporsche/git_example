import { AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';
import { WorkingCalenderService } from '../../management/model/working-calender/service/working-calender.service';

export class WorkingCalenderValidator {

  static shouldBeUnique(workingCalenderService: WorkingCalenderService) {
    return (control: AbstractControl) => {
      if(control.value.trim() !== '') {
        return workingCalenderService.findByName(control.value.trim())
          .map(response => {
            return (!response) ? null : { shouldBeUnique: true };
          });
      }
      
    };
  }

}