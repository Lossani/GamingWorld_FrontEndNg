import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentViewPageComponent } from './tournament-view-page.component';

describe('TournamentViewPageComponent', () => {
  let component: TournamentViewPageComponent;
  let fixture: ComponentFixture<TournamentViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentViewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
