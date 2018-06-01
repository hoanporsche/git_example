import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonValidator } from '../../../custom-validator/common.validator';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  @Output() emitAction = new EventEmitter<Object>();
  formCurrentUser: FormGroup;
  currentUser;
  constructor(
    private fb: FormBuilder,
  ) {
    this.formCurrentUser = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty], []],
      phone: ['', [Validators.required, CommonValidator.notEmpty, CommonValidator.mustPhoneNumber], []],
    });
  }

  ngOnInit() {
  }

  setCurrentUser() {
    this.currentUser = {
      name: this.name.value,
      phone: this.phone.value,
    }
    this.emitAction.emit(this.currentUser);
  }

  setChatByFb() {
    this.emitAction.emit('byFb');
  }

  get name() {
    return this.formCurrentUser.get('name');
  }

  get phone() {
    return this.formCurrentUser.get('phone');
  }

}
