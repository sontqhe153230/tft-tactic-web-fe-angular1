import { TestBed } from '@angular/core/testing';

import { ChampionServiceService } from './champion-service.service';

describe('ChampionServiceService', () => {
  let service: ChampionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChampionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
