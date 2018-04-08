import { TestBed, inject } from '@angular/core/testing';

import { TimekeepingService } from './timekeeping.service';

describe('TimekeepingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimekeepingService]
    });
  });

  it('should be created', inject([TimekeepingService], (service: TimekeepingService) => {
    expect(service).toBeTruthy();
  }));
});
