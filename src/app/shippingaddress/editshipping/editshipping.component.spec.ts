import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditshippingComponent } from './editshipping.component';

describe('EditshippingComponent', () => {
  let component: EditshippingComponent;
  let fixture: ComponentFixture<EditshippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditshippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditshippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
