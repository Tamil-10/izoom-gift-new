import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentgatwayComponent } from './paymentgatway.component';

describe('PaymentgatwayComponent', () => {
  let component: PaymentgatwayComponent;
  let fixture: ComponentFixture<PaymentgatwayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentgatwayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentgatwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
