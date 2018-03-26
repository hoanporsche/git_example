import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimekeepingStatusListComponent } from './timekeeping-status-list.component';

describe('TimekeepingStatusListComponent', () => {
  let component: TimekeepingStatusListComponent;
  let fixture: ComponentFixture<TimekeepingStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimekeepingStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimekeepingStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
