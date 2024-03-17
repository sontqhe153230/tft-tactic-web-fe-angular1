import { TestBed } from '@angular/core/testing';

import { AugumentServiceService } from './augument-service.service';

describe('AugumentServiceService', () => {
  let service: AugumentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AugumentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
