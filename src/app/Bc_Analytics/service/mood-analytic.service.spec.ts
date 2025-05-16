import { TestBed } from '@angular/core/testing';

import { MoodAnalyticService } from './mood-analytic.service';

describe('MoodAnalyticService', () => {
  let service: MoodAnalyticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodAnalyticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
