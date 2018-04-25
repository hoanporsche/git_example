import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingCalenderCreateComponent } from './working-calender-create.component';

describe('WorkingCalenderCreateComponent', () => {
  let component: WorkingCalenderCreateComponent;
  let fixture: ComponentFixture<WorkingCalenderCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingCalenderCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingCalenderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
