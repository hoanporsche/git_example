import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonValidator } from '../../../custom-validator/common.validator';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  @Output() emitChatUser = new EventEmitter<Object>();
  formChatUser: FormGroup;
  chatUser;
  constructor(
    private fb: FormBuilder,
  ) {
    this.formChatUser = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty], []],
      phone: ['', [Validators.required, CommonValidator.notEmpty, CommonValidator.mustPhoneNumber], []],
    });
  }

  ngOnInit() {
  }

  setChatUser() {
    this.chatUser = {
      name: this.name.value,
      phone: this.phone.value,
    }
    this.emitChatUser.emit(this.chatUser);
  }

  setChatByFb() {
    this.emitChatUser.emit('byFb');
  }

  get name() {
    return this.formChatUser.get('name');
  }

  get phone() {
    return this.formChatUser.get('phone');
  }

}
