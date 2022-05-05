import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmSigninTournamentComponent} from './confirm-signin-tournament.component';

describe('ConfirmSigninTournamentComponent', () => {
  let component: ConfirmSigninTournamentComponent;
  let fixture: ComponentFixture<ConfirmSigninTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmSigninTournamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSigninTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
