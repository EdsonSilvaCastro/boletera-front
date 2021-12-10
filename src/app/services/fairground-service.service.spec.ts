import { TestBed } from '@angular/core/testing';

import { FairgroundServiceService } from './fairground-service.service';

describe('FairgroundServiceService', () => {
  let service: FairgroundServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FairgroundServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
