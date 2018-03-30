import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { RoleService } from '../../service/role.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { RoleValidator } from '../../../../shared/custom-validator/role.validator';
import { CommonValidator } from '../../../../shared/custom-validator/common.validator';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if (this.subRole)
      this.subRole.unsubscribe();
  }
  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  formRole: FormGroup;

  private subRole: Subscription;
  constructor(
    private roleService: RoleService,
    private navigationService: NavigationService,
    private fb: FormBuilder
  ) {
    this.formRole = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty], [RoleValidator.shouldBeUnique(this.roleService)]]
    })
  }

  ngOnInit() {
  }

  onCancel() {
    this.formRole.reset();
  }
  onSubmit() {
    if (this.formRole.valid) {
      const role = {
        name: this.name.value.trim()
      }
      this.subRole = this.roleService.save(role)
        .subscribe(response => {
          if (response.name === this.name.value.trim()) {
            this.submitted.emit('success');
            this.formRole.reset();
          }
        }, error => {
          this.submitted.emit('fail');
        });
    }
  }

  get name() {
    return this.formRole.get('name');
  }

}
