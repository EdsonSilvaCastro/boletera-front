import { TestBed } from '@angular/core/testing';

import { ArtistCrudService } from './artist-crud.service';

describe('ArtistCrudService', () => {
  let service: ArtistCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
