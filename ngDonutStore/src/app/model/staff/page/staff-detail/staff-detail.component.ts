import { IdentityService } from './../../../../core/services/identity.service';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Staff } from '../../staff';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { StaffService } from '../../service/staff.service';
import { CommonValidator } from '../../../../shared/custom-validator/common.validator';
import { Store } from '../../../store/store';
import { WorkingCalender } from '../../../working-calender/working-calender';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit, OnDestroy {

  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  @Input() oldStaff: Staff;

  @Input() listStore: Store[];
  @Input() listWorkingCalender: WorkingCalender[];
  @Input() isAdmin: boolean;

  formStaff: FormGroup;

  private subStaff: Subscription;

  constructor(
    private fb: FormBuilder,
    public staffService: StaffService,
    private identityService: IdentityService,
  ) {
    this.formStaff = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty]],
      picture: ['', [Validators.required, CommonValidator.notEmpty]],
      storeId: ['',[Validators.required]],
      phone: ['', [Validators.required, CommonValidator.notEmpty]],
      address: ['', [Validators.required, CommonValidator.notEmpty]],
      identityCard: ['', [Validators.required]],
      homeTown: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      workingCalenderId: ['', [Validators.required]]
    });
    this.isAdmin = false;
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subStaff)
      this.subStaff.unsubscribe();
  }

  validateIdentityCard() {
    const oldIdentityCard = this.oldStaff.identityCard;
    if (this.identityCard.value && this.identityCard.value.toString().trim() !== '') {
      this.staffService.findByIdentityCard(this.identityCard.value.toString().trim())
        .subscribe(response => {
          if (response && response.identityCard != oldIdentityCard)
            this.name.setErrors({ shouldBeUnique: true });
        }, error => {
          console.log(error)
        });
    }
  }
  onSubmit() {
    if (this.formStaff.valid) {
      let staff = {
        id: this.oldStaff.id,
        name: this.name.value.trim(),
        picture: this.picture.value.trim(),
        storeId: this.storeId.value,
        phone: this.phone.value.toString().trim(),
        address: this.address.value.trim(),
        identityCard: this.identityCard.value.toString().trim(),
        homeTown: this.homeTown.value.trim(),
        salary: this.salary.value.toString().trim(),
        workingCalenderId: this.workingCalenderId.value
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

  onCancel() {
    this.formStaff.reset();
  }

  get name() {
    return this.formStaff.get('name');
  }

  get picture() {
    return this.formStaff.get('picture');
  }

  get storeId() {
    return this.formStaff.get('storeId');
  }

  get phone() {
    return this.formStaff.get('phone');
  }

  get address() {
    return this.formStaff.get('address');
  }

  get identityCard() {
    return this.formStaff.get('identityCard');
  }

  get homeTown() {
    return this.formStaff.get('homeTown');
  }

  get salary() {
    return this.formStaff.get('salary');
  }

  get workingCalenderId() {
    return this.formStaff.get('workingCalenderId');
  }
}
