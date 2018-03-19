import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDailyReportCreateComponent } from './material-daily-report-create.component';

describe('MaterialDailyReportCreateComponent', () => {
  let component: MaterialDailyReportCreateComponent;
  let fixture: ComponentFixture<MaterialDailyReportCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialDailyReportCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDailyReportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
