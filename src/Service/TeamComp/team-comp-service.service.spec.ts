import { TestBed } from '@angular/core/testing';

import { TeamCompServiceService } from './team-comp-service.service';

describe('TeamCompServiceService', () => {
  let service: TeamCompServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamCompServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
