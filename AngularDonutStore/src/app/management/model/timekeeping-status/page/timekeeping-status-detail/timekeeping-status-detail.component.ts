import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { TimekeepingStatus } from '../../timekeeping-status';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { TimekeepingStatusService } from '../../service/timekeeping-status.service';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { CommonValidator } from '../../../../../shared/custom-validator/common.validator';

@Component({
  selector: 'app-timekeeping-status-detail',
  templateUrl: './timekeeping-status-detail.component.html',
  styleUrls: ['./timekeeping-status-detail.component.css']
})
export class TimekeepingStatusDetailComponent implements OnInit, OnDestroy {

  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  @Input() oldTimekeepingStatus: TimekeepingStatus;

  formTimekeepingStatus: FormGroup;

  private subTimekeepingStatus: Subscription;

  constructor(
    private fb: FormBuilder,
    public timekeepingStatusService: TimekeepingStatusService,
    private navigationService: NavigationService,
  ) {
    this.formTimekeepingStatus = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty]],
      description: [''],
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subTimekeepingStatus)
      this.subTimekeepingStatus.unsubscribe();
  }

  validateName() {
    const oldName = this.oldTimekeepingStatus.name;
    if (this.name.value.trim() !== '') {
      this.timekeepingStatusService.findByName(this.name.value.trim())
        .subscribe(response => {
          if (response && response.name != oldName)
            this.name.setErrors({ shouldBeUnique: true });
        }, error => {
          console.log(error)
        });
    }
  }
  onSubmit() {
    if (this.formTimekeepingStatus.valid) {
      const timekeepingStatus = {
        id: this.oldTimekeepingStatus.id,
        name: this.name.value.trim(),
        description: this.description.value.trim()
      }
      this.subTimekeepingStatus = this.timekeepingStatusService.save(timekeepingStatus)
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
    return this.formTimekeepingStatus.get('name');
  }

  get description() {
    return this.formTimekeepingStatus.get('description');
  }

}
