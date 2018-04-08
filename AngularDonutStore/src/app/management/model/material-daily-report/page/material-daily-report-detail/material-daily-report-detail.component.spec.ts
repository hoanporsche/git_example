import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDailyReportDetailComponent } from './material-daily-report-detail.component';

describe('MaterialDailyReportDetailComponent', () => {
  let component: MaterialDailyReportDetailComponent;
  let fixture: ComponentFixture<MaterialDailyReportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialDailyReportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDailyReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
