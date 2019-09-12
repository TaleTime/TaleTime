import {TestBed} from "@angular/core/testing";

import {PublicStoryHelperService} from "./public-story-helper.service";

describe("PublicStoryHelperService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PublicStoryHelperService = TestBed.get(PublicStoryHelperService);
    expect(service).toBeTruthy();
  });
});
