import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollconfigComponent } from './pollconfig.component';

describe('PollconfigComponent', () => {
  let component: PollconfigComponent;
  let fixture: ComponentFixture<PollconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
