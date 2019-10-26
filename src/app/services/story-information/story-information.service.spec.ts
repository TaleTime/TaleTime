import { TestBed } from '@angular/core/testing';

import { StoryInformationService } from './story-information.service';

describe('StoryDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoryInformationService = TestBed.get(StoryInformationService);
    expect(service).toBeTruthy();
  });
});
