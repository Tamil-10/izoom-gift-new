import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedpollsComponent } from './publishedpolls.component';

describe('PublishedpollsComponent', () => {
  let component: PublishedpollsComponent;
  let fixture: ComponentFixture<PublishedpollsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishedpollsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedpollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
