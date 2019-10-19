import { TestBed } from '@angular/core/testing';

import { PlayerParamsService } from './player-params.service';

describe('PlayerParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerParamsService = TestBed.get(PlayerParamsService);
    expect(service).toBeTruthy();
  });
});
