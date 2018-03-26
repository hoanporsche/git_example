import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingCalenderListComponent } from './working-calender-list.component';

describe('WorkingCalenderListComponent', () => {
  let component: WorkingCalenderListComponent;
  let fixture: ComponentFixture<WorkingCalenderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingCalenderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingCalenderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
