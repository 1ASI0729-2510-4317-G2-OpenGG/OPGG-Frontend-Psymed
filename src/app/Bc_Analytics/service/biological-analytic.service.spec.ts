import { TestBed } from '@angular/core/testing';

import { BiologicalAnalyticService } from './biological-analytic.service';

describe('BiologicalAnalyticService', () => {
  let service: BiologicalAnalyticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiologicalAnalyticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
