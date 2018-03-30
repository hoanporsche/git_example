import { RoleService } from './../../model/role/service/role.service';
import { AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';

export class RoleValidator {

  static shouldBeUnique(roleService: RoleService) {
    return (control: AbstractControl) => {
      if(control.value.trim() !== '') {
        return roleService.findByName(control.value.trim())
          .map(response => {
            return (!response) ? null : { shouldBeUnique: true };
          });
      }
      
    };
  }

}