import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimekeepingStatusCreateComponent } from './timekeeping-status-create.component';

describe('TimekeepingStatusCreateComponent', () => {
  let component: TimekeepingStatusCreateComponent;
  let fixture: ComponentFixture<TimekeepingStatusCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimekeepingStatusCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimekeepingStatusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
