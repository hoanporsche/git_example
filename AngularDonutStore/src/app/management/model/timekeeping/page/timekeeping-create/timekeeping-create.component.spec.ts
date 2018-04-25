import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimekeepingCreateComponent } from './timekeeping-create.component';

describe('TimekeepingCreateComponent', () => {
  let component: TimekeepingCreateComponent;
  let fixture: ComponentFixture<TimekeepingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimekeepingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimekeepingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
