import {TestBed} from "@angular/core/testing";

import {LanguageFileService} from "./language-file.service";

describe("LanguageFileService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: LanguageFileService = TestBed.get(LanguageFileService);
    expect(service).toBeTruthy();
  });
});
