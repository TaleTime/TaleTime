import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {CreateUserProfilePage} from "./create-user-profile.page";

describe("CreateUserProfilePage", () => {
  let component: CreateUserProfilePage;
  let fixture: ComponentFixture<CreateUserProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserProfilePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
