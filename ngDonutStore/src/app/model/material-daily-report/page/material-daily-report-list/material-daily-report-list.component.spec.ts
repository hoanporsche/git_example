import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDailyReportListComponent } from './material-daily-report-list.component';

describe('MaterialDailyReportListComponent', () => {
  let component: MaterialDailyReportListComponent;
  let fixture: ComponentFixture<MaterialDailyReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialDailyReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDailyReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
