import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagepollconfigComponent } from './managepollconfig.component';

describe('ManagepollconfigComponent', () => {
  let component: ManagepollconfigComponent;
  let fixture: ComponentFixture<ManagepollconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagepollconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagepollconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
