import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftsCarouselComponent } from './giftscarousel.component';

describe('GiftsCarouselComponent', () => {
  let component: GiftsCarouselComponent;
  let fixture: ComponentFixture<GiftsCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftsCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
