import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../service/user.service';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '../../../store/store';
import { Subscription } from 'rxjs/Subscription';
import { Role } from '../../../role/role';
import { CommonValidator } from '../../../../../shared/custom-validator/common.validator';
import { UserValidator } from '../../../../../shared/custom-validator/user.validator';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit, OnDestroy {
  @Output() submitted = new EventEmitter<string>();
  @Input() listStore: Store[];
  @Input() listRole: Role[]

  formUser: FormGroup;

  private subUser: Subscription;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) { 
    this.formUser = this.fb.group({
      email: ['',[Validators.required, Validators.email, CommonValidator.notEmpty], [UserValidator.shouldBeUnique(this.userService)]],
      password: ['', [Validators.required, CommonValidator.notEmpty]],
      storeId: ['', Validators.required],
      roles: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subUser)
      this.subUser.unsubscribe()
  }

  onSubmit() {
    if (this.formUser.valid) {
      const user = {
        email: this.email.value.trim(),
        password: this.password.value.trim(),
        storeId: this.storeId.value,
        roles: [this.roles.value]
      }
      this.subUser = this.userService.save(user)
        .subscribe(response => {
          if (response.email === this.email.value.trim()) {
            this.submitted.emit('success');
            this.formUser.reset();
          }
        }, error => {
          this.submitted.emit('fail');
        });
    }
  }

  onCancel() {
    this.formUser.reset();
  }

  get email() {
    return this.formUser.get('email');
  }

  get password() {
    return this.formUser.get('password');
  }

  get storeId() {
    return this.formUser.get('storeId');
  }

  get roles() {
    return this.formUser.get('roles');
  }
}
