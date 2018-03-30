import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { WorkingCalender } from '../../working-calender';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { WorkingCalenderService } from '../../service/working-calender.service';
import { NavigationService } from '../../../../core/services/navigation.service';
import { CommonValidator } from '../../../../shared/custom-validator/common.validator';

@Component({
  selector: 'app-working-calender-detail',
  templateUrl: './working-calender-detail.component.html',
  styleUrls: ['./working-calender-detail.component.css']
})
export class WorkingCalenderDetailComponent implements OnInit, OnDestroy {

  // To inform parent when the department is created successfully.
  @Output() submitted = new EventEmitter<string>();

  @Input() oldWorkingCalender: WorkingCalender;

  formWorkingCalender: FormGroup;

  private subWorkingCalender: Subscription;

  constructor(
    private fb: FormBuilder,
    public workingCalenderService: WorkingCalenderService,
    private navigationService: NavigationService,
  ) {
    this.formWorkingCalender = fb.group({
      name: ['', [Validators.required, CommonValidator.notEmpty]],
      description: [''],
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subWorkingCalender)
      this.subWorkingCalender.unsubscribe();
  }

  validateName() {
    const oldName = this.oldWorkingCalender.name;
    if (this.name.value.trim() !== '') {
      this.workingCalenderService.findByName(this.name.value.trim())
        .subscribe(response => {
          if (response && response.name != oldName)
            this.name.setErrors({ shouldBeUnique: true });
        }, error => {
          console.log(error)
        });
    }
  }
  onSubmit() {
    if (this.formWorkingCalender.valid) {
      const workingCalender = {
        id: this.oldWorkingCalender.id,
        name: this.name.value.trim(),
        description: this.description.value.trim()
      }
      this.subWorkingCalender = this.workingCalenderService.save(workingCalender)
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
    return this.formWorkingCalender.get('name');
  }

  get description() {
    return this.formWorkingCalender.get('description');
  }
}
