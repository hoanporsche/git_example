
import { UserService } from './../../service/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  @Output() changed = new EventEmitter<string>();
  @Input() currentUser;
  formChangePassword: FormGroup;

  error = {
    isError: false,
    message: ''
  };

  private subUser: Subscription;
  ngOnDestroy(): void {
    if (this.subUser)
      this.subUser.unsubscribe();
  }
  constructor(private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.formChangePassword = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      rePassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    
  }

  validateRePassword() {
    if (this.newPassword.value !== '' && this.rePassword.value !== '') {
      if (this.newPassword.value !== this.rePassword.value) {
        this.rePassword.setErrors({notMatch: true});
      }
    }
  }
  onSubmit() {
    if (this.formChangePassword.valid) {
      const user = {
        email: this.currentUser.user_name.trim(),
        oldPassword: this.oldPassword.value,
        newPassword: this.newPassword.value,
      }
      this.subUser = this.userService.changePassword(user)
        .subscribe(response => {
          this.changed.emit('success');
        }, error => {
          this.error.isError = true;
          this.error.message = error.error;
        });
    }
  }

  onCancel() {
    this.formChangePassword.reset();
  }

  get oldPassword() {
    return this.formChangePassword.get('oldPassword');
  }
  get newPassword() {
    return this.formChangePassword.get('newPassword');
  }
  get rePassword() {
    return this.formChangePassword.get('rePassword');
  }
}
