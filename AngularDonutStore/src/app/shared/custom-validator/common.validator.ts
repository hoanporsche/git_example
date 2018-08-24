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

  static mustPhoneNumber(control: AbstractControl) {
    let value: string = '';
    if (control.value.trim()) {
      value = control.value.toString().trim();
      const firtsChar = value.substring(0, 2);
      if (value.length === 10 && (firtsChar === '09' || firtsChar === '08')) {
        return null;
      } if (value.length === 11 && firtsChar === '01') {
        return null;
      } else {
        return { mustPhoneNumber: true}
      }
    }
    return null;
  }
}
