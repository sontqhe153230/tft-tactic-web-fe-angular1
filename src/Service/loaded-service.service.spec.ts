import { TestBed } from '@angular/core/testing';

import { LoadedServiceService } from './loaded-service.service';

describe('LoadedServiceService', () => {
  let service: LoadedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
