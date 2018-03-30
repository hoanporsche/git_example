import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { StaffService } from '../../service/staff.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { CommonValidator } from '../../../../shared/custom-validator/common.validator';
import { StaffValidator } from '../../../../shared/custom-validator/staff.validator';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
  styleUrls: ['./staff-create.component.css']
})
export class StaffCreateComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if (this.subStaff)
      this.subStaff.unsubscribe();
  }
  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  formStaff: FormGroup;

  private subStaff: Subscription;
  constructor(
    private staffService: StaffService,
    private navigationService: NavigationService,
    private fb: FormBuilder
  ) {
    this.formStaff = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty], [StaffValidator.shouldBeUnique(this.staffService)]],
      picture: ['', [Validators.required, CommonValidator.notEmpty]],
      storeId: ['',[Validators.required]],
      phone: ['', [Validators.required, CommonValidator.notEmpty]],
      address: ['', [Validators.required, CommonValidator.notEmpty]],
      identityCard: ['', [Validators.required]],
      homeTown: ['', [Validators.required]],
      salary: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  onCancel() {
    this.formStaff.reset();
  }
  onSubmit() {
    if (this.formStaff.valid) {
      const staff = {
        name: this.name.value.trim(),
        phone: this.phone.value.trim(),
        picture: this.picture.value.trim(),
        address: this.address.value.trim()
      }
      this.subStaff = this.staffService.save(staff)
        .subscribe(response => {
          if (response.name === this.name.value.trim()) {
            this.submitted.emit('success');
            this.formStaff.reset();
          }
        }, error => {
          this.submitted.emit('fail');
        });
    }
  }

  get name() {
    return this.formStaff.get('name');
  }

  get picture() {
    return this.formStaff.get('picture');
  }

  get phone() {
    return this.formStaff.get('phone');
  }

  get address() {
    return this.formStaff.get('address');
  }

}
