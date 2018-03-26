import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimekeepingStatusDetailComponent } from './timekeeping-status-detail.component';

describe('TimekeepingStatusDetailComponent', () => {
  let component: TimekeepingStatusDetailComponent;
  let fixture: ComponentFixture<TimekeepingStatusDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimekeepingStatusDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimekeepingStatusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
