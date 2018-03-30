import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Role } from '../../role';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { RoleService } from '../../service/role.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { CommonValidator } from '../../../../shared/custom-validator/common.validator';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit, OnDestroy {

  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  @Input() oldRole: Role;

  formRole: FormGroup;

  private subRole: Subscription;

  constructor(
    private fb: FormBuilder,
    public roleService: RoleService,
    private navigationService: NavigationService,
  ) {
    this.formRole = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty]]
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subRole)
      this.subRole.unsubscribe();
  }

  validateName() {
    const oldName = this.oldRole.name;
    if (this.name.value.trim() !== '') {
      this.roleService.findByName(this.name.value.trim())
        .subscribe(response => {
          if (response && response.name != oldName)
            this.name.setErrors({ shouldBeUnique: true });
        }, error => {
          console.log(error)
        });
    }
  }
  onSubmit() {
    if (this.formRole.valid) {
      const role = {
        id: this.oldRole.id,
        name: this.name.value.trim()
      }
      this.subRole = this.roleService.save(role)
        .subscribe(response => {
          if (response.name === this.name.value.trim()) {
            this.submitted.emit('success');
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
