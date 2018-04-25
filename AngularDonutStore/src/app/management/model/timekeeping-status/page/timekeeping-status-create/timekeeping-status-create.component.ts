import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { TimekeepingStatusService } from '../../service/timekeeping-status.service';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { TimekeepingStatusValidator } from '../../../../../shared/custom-validator/timekeeping-status.validator';
import { CommonValidator } from '../../../../../shared/custom-validator/common.validator';

@Component({
  selector: 'app-timekeeping-status-create',
  templateUrl: './timekeeping-status-create.component.html',
  styleUrls: ['./timekeeping-status-create.component.css']
})
export class TimekeepingStatusCreateComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if (this.subTimekeepingStatus)
      this.subTimekeepingStatus.unsubscribe();
  }
  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  formTimekeepingStatus: FormGroup;

  private subTimekeepingStatus: Subscription;
  constructor(
    private timekeepingStatusService: TimekeepingStatusService,
    private navigationService: NavigationService,
    private fb: FormBuilder
  ) {
    this.formTimekeepingStatus = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty], [TimekeepingStatusValidator.shouldBeUnique(this.timekeepingStatusService)]],
      description: [''],
    })
  }

  ngOnInit() {
  }

  onCancel() {
    this.formTimekeepingStatus.reset();
  }
  onSubmit() {
    if (this.formTimekeepingStatus.valid) {
      const timekeepingStatus = {
        name: this.name.value.trim(),
        description: this.description.value.trim()
      }
      this.subTimekeepingStatus = this.timekeepingStatusService.save(timekeepingStatus)
        .subscribe(response => {
          if (response.name === this.name.value.trim()) {
            this.submitted.emit('success');
            this.formTimekeepingStatus.reset();
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
