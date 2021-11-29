import { TestBed } from '@angular/core/testing';

import { VenueCrudService } from './venue-crud.service';

describe('VenueCrudService', () => {
  let service: VenueCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenueCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
