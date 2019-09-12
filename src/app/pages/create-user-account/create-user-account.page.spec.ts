import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {CreateUserAccountPage} from "./create-user-account.page";

describe("CreateUserAccountPage", () => {
  let component: CreateUserAccountPage;
  let fixture: ComponentFixture<CreateUserAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserAccountPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
