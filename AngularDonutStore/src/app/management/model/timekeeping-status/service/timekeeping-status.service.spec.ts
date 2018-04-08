import { TestBed, inject } from '@angular/core/testing';

import { TimekeepingStatusService } from './timekeeping-status.service';

describe('TimekeepingStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimekeepingStatusService]
    });
  });

  it('should be created', inject([TimekeepingStatusService], (service: TimekeepingStatusService) => {
    expect(service).toBeTruthy();
  }));
});
