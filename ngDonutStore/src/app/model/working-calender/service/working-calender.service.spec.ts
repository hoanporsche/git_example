import { TestBed, inject } from '@angular/core/testing';

import { WorkingCalenderService } from './working-calender.service';

describe('WorkingCalenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkingCalenderService]
    });
  });

  it('should be created', inject([WorkingCalenderService], (service: WorkingCalenderService) => {
    expect(service).toBeTruthy();
  }));
});
