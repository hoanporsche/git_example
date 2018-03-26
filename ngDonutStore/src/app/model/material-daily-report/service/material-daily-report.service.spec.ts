import { TestBed, inject } from '@angular/core/testing';

import { MaterialDailyReportService } from './material-daily-report.service';

describe('MaterialDailyReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialDailyReportService]
    });
  });

  it('should be created', inject([MaterialDailyReportService], (service: MaterialDailyReportService) => {
    expect(service).toBeTruthy();
  }));
});
