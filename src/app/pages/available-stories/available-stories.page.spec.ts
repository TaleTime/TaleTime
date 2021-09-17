import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import {AvailableStoriesPage} from "./available-stories.page";
import {
  MockedAuthService,
  MockedNavController,
  MockedRouter,
  MockedSettingsService,
  MockedStorage, MockedToastService,
  MockedTranslateService
} from "src/utils/karma/mocks"




// describe("AvailableStoriesPage", () => {
//   let component: AvailableStoriesPage;
//   let fixture: ComponentFixture<AvailableStoriesPage>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [AvailableStoriesPage],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AvailableStoriesPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it("should create", () => {
//     expect(component).toBeTruthy();
//   });
// });
