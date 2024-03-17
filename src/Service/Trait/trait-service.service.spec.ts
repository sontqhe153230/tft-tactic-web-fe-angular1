import { TestBed } from '@angular/core/testing';

import { TraitServiceService } from './trait-service.service';

describe('TraitServiceService', () => {
  let service: TraitServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraitServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
