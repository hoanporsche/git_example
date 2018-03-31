import { UserService } from './../../model/user/service/user.service';
import { AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';

export class UserValidator {

  static shouldBeUnique(userStatusService: UserService) {
    return (control: AbstractControl) => {
      if(control.value.trim() !== '') {
        return userStatusService.findByEmail(control.value.trim())
          .map(response => {
            return (!response) ? null : { shouldBeUnique: true };
          });
      }
      
    };
  }

}