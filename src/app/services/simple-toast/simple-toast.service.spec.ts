import {TestBed} from "@angular/core/testing";

import {SimpleToastService} from "./simple-toast.service";

describe("SimpleToastService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: SimpleToastService = TestBed.get(SimpleToastService);
    expect(service).toBeTruthy();
  });
});
