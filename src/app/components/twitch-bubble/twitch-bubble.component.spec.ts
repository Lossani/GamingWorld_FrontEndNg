import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchBubbleComponent } from './twitch-bubble.component';

describe('TwitchBubbleComponent', () => {
  let component: TwitchBubbleComponent;
  let fixture: ComponentFixture<TwitchBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitchBubbleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
