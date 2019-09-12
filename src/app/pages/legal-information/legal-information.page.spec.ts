import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {LegalInformationPage} from "./legal-information.page";

describe("LegalInformationPage", () => {
  let component: LegalInformationPage;
  let fixture: ComponentFixture<LegalInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LegalInformationPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
