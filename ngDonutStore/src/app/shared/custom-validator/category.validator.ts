import { CategoryService } from './../../model/category/service/category.service';
import { AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';

export class CategoryValidator {

  static shouldBeUnique(categoryService: CategoryService) {
    return (control: AbstractControl) => {
      if(control.value) {
        return categoryService.findByName(control.value)
          .map(response => {
            return (!response) ? null : { shouldBeUnique: true };
          });
      }
      
    };
  }

}