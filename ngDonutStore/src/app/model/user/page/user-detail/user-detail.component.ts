import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { User } from '../../user';
import { Store } from '../../../store/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../service/user.service';
import { CommonValidator } from '../../../../shared/custom-validator/common.validator';
import { Role } from '../../../role/role';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  @Input() oldUser: User;
  @Input() listStore: Store[];
  @Input() listRole: Role[];

  formUser: FormGroup;

  private subUser: Subscription;

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
  ) {
    this.formUser = fb.group({
      storeId: ['', Validators.required],
      roles: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subUser)
      this.subUser.unsubscribe();
  }
  onSubmit() {
    if (this.formUser.valid) {
      const user = {
        id: this.oldUser.id,
        email: this.userService.getUser().email,
        password: this.userService.getUser().password,
        storeId: this.storeId.value,
        roles: [this.roles.value]
      }
      this.subUser = this.userService.save(user)
        .subscribe(response => {
          if (response.email === this.userService.getUser().email) {
            this.submitted.emit('success');
          }
        }, error => {
          this.submitted.emit('fail');
        });
    }
  }

  get storeId() {
    return this.formUser.get('storeId');
  }

  get roles() {
    return this.formUser.get('roles');
  }
}
