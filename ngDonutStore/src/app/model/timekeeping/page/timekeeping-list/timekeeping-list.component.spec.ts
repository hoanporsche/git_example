import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimekeepingListComponent } from './timekeeping-list.component';

describe('TimekeepingListComponent', () => {
  let component: TimekeepingListComponent;
  let fixture: ComponentFixture<TimekeepingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimekeepingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimekeepingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
