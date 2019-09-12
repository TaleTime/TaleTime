import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ChangeUserAccountPinPage} from "./change-user-account-pin.page";

describe("ChangeUserAccountPinPage", () => {
  let component: ChangeUserAccountPinPage;
  let fixture: ComponentFixture<ChangeUserAccountPinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeUserAccountPinPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserAccountPinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
