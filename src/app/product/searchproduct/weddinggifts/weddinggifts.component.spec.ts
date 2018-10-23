import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddinggiftsComponent } from './weddinggifts.component';

describe('WeddinggiftsComponent', () => {
  let component: WeddinggiftsComponent;
  let fixture: ComponentFixture<WeddinggiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeddinggiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeddinggiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
