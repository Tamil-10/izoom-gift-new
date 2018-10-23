import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderfilterComponent } from './genderfilter.component';

describe('GenderfilterComponent', () => {
  let component: GenderfilterComponent;
  let fixture: ComponentFixture<GenderfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenderfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
