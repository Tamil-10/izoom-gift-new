import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageproductconfigComponent } from './manageproductconfig.component';

describe('ManageproductconfigComponent', () => {
  let component: ManageproductconfigComponent;
  let fixture: ComponentFixture<ManageproductconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageproductconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageproductconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
