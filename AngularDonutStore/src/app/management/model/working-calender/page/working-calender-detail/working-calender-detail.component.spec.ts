import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingCalenderDetailComponent } from './working-calender-detail.component';

describe('WorkingCalenderDetailComponent', () => {
  let component: WorkingCalenderDetailComponent;
  let fixture: ComponentFixture<WorkingCalenderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingCalenderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingCalenderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
