import {TestBed} from "@angular/core/testing";

import {TtsTextService} from "./tts-text.service";

describe("TtsTextService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: TtsTextService = TestBed.get(TtsTextService);
    expect(service).toBeTruthy();
  });
});
