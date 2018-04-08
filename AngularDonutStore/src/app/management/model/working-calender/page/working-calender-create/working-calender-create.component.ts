import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { WorkingCalenderService } from '../../service/working-calender.service';
import { NavigationService } from '../../../../../core/services/navigation.service';
import { WorkingCalenderValidator } from '../../../../../shared/custom-validator/working-calender.validator';
import { CommonValidator } from '../../../../../shared/custom-validator/common.validator';

@Component({
  selector: 'app-working-calender-create',
  templateUrl: './working-calender-create.component.html',
  styleUrls: ['./working-calender-create.component.css']
})
export class WorkingCalenderCreateComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if (this.subWorkingCalender)
      this.subWorkingCalender.unsubscribe();
  }
  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  formWorkingCalender: FormGroup;

  private subWorkingCalender: Subscription;
  constructor(
    private workingCalenderService: WorkingCalenderService,
    private navigationService: NavigationService,
    private fb: FormBuilder
  ) {
    this.formWorkingCalender = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty], [WorkingCalenderValidator.shouldBeUnique(this.workingCalenderService)]],
      description: [''],
    })
  }

  ngOnInit() {
  }

  onCancel() {
    this.formWorkingCalender.reset();
  }
  onSubmit() {
    if (this.formWorkingCalender.valid) {
      const workingCalender = {
        name: this.name.value.trim(),
        description: this.description.value.trim()
      }
      this.subWorkingCalender = this.workingCalenderService.save(workingCalender)
        .subscribe(response => {
          if (response.name === this.name.value.trim()) {
            this.submitted.emit('success');
            this.formWorkingCalender.reset();
          }
        }, error => {
          this.submitted.emit('fail');
        });
    }
  }

  get name() {
    return this.formWorkingCalender.get('name');
  }

  get description() {
    return this.formWorkingCalender.get('description');
  }

}
