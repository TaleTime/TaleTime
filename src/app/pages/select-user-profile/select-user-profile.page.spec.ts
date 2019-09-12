import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {SelectUserProfilePage} from "./select-user-profile.page";

describe("SelectUserProfilePage", () => {
  let component: SelectUserProfilePage;
  let fixture: ComponentFixture<SelectUserProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectUserProfilePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUserProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
