import {TestBed} from "@angular/core/testing";

import {SaveGameService} from "./save-game.service";

describe("SaveGameService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: SaveGameService = TestBed.get(SaveGameService);
        expect(service).toBeTruthy();
    });
});
