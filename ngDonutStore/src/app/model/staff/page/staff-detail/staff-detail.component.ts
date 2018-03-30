import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Staff } from '../../staff';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { StaffService } from '../../service/staff.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { CommonValidator } from '../../../../shared/custom-validator/common.validator';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit, OnDestroy {

  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  @Input() oldStaff: Staff;

  formStaff: FormGroup;

  private subStaff: Subscription;

  constructor(
    private fb: FormBuilder,
    public staffService: StaffService,
    private navigationService: NavigationService,
  ) {
    this.formStaff = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty]],
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

  ngOnDestroy(): void {
    if (this.subStaff)
      this.subStaff.unsubscribe();
  }

  validateName() {
    const oldName = this.oldStaff.name;
    if (this.name.value.trim() !== '') {
      this.staffService.findByName(this.name.value.trim())
        .subscribe(response => {
          if (response && response.name != oldName)
            this.name.setErrors({ shouldBeUnique: true });
        }, error => {
          console.log(error)
        });
    }
  }
  onSubmit() {
    if (this.formStaff.valid) {
      const staff = {
        id: this.oldStaff.id,
        name: this.name.value.trim(),
        picture: this.picture.value.trim(),
        phone: this.phone.value.trim(),
        address: this.address.value.trim()
      }
      this.subStaff = this.staffService.save(staff)
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
    return this.formStaff.get('name');
  }

  get phone() {
    return this.formStaff.get('phone');
  }

  get address() {
    return this.formStaff.get('address');
  }
  
  get picture() {
    return this.formStaff.get('picture');
  }

}
