import {TestBed} from "@angular/core/testing";

import {PublicStoryHelperService} from "./public-story-helper.service";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from "../../app-routing.module";
import {Platform} from "@ionic/angular";
import {
  MockedFile, MockedPlatform, MockedSettingsService,
} from "../../../utils/karma/mocks";
import {SettingsService} from "../settings/settings.service";
import {StoryInformation} from "../../models/storyInformation";



let settingsService;
let platform;
let file;

function renewTestbed(){
  TestBed.configureTestingModule({
    imports: [RouterTestingModule.withRoutes(routes)],
    declarations: [
    ],
    providers: [
      {provide: SettingsService, useClass: MockedSettingsService},
      {provide: Platform, useClass: MockedPlatform},
      {provide: File, useClass: MockedFile}
    ]
  });

  settingsService = TestBed.get(SettingsService)
  platform = TestBed.get(Platform)
  file = TestBed.get(File)
}

describe('Test StoryJsonFolderPath', () =>{
  let publicStoryHelperService

  beforeEach(() => {
    renewTestbed()
    publicStoryHelperService = new PublicStoryHelperService(platform, file, settingsService)
  });

  afterEach(() => {
    publicStoryHelperService = null
  });
  it('Path is containing storyId and language', () => {
    let storyInformation = new StoryInformation()
    storyInformation.id = "someblabal"
    storyInformation.language = "english"

    publicStoryHelperService.publicStoryBasePath = "basepath"
    expect(publicStoryHelperService.getStoryJsonFolderPath(storyInformation, storyInformation.language))
      .toEqual("basepathsomeblabal/english/")
  })
  it('Path is containing storyId and language 2', () => {
    let storyInformation = new StoryInformation()
    storyInformation.id = "some storyId"
    storyInformation.language = "german"

    publicStoryHelperService.publicStoryBasePath = "basepath"
    expect(publicStoryHelperService.getStoryJsonFolderPath(storyInformation, storyInformation.language))
      .toEqual("basepathsome storyId/german/")
  })
  it('Path is containing storyId and language 3', () => {
    let storyInformation = new StoryInformation()
    storyInformation.id = "some storyId"
    storyInformation.language = "spanish"

    publicStoryHelperService.publicStoryBasePath = "basepath"
    expect(publicStoryHelperService.getStoryJsonFolderPath(storyInformation, storyInformation.language))
      .toEqual("basepathsome storyId/spanish/")
  })
})

// describe("PublicStoryHelperService", () => {
//   beforeEach(() => TestBed.configureTestingModule({}));
//
//   it("should be created", () => {
//     const service: PublicStoryHelperService = TestBed.get(PublicStoryHelperService);
//     expect(service).toBeTruthy();
//   });
// });
