import { AbstractControl } from "@angular/forms";


export class CommonValidator {

  static notEmpty(control: AbstractControl) {
    let value: string = '';
    if (control.value) {
      value = control.value.toString().trim();
      return (value === '') ? { notEmpty: true } : null;
    }
    return null;
  }
}