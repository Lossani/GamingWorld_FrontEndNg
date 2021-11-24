import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmEndTournamentComponent} from './confirm-end-tournament.component';

describe('ConfirmEndTournamentComponent', () => {
  let component: ConfirmEndTournamentComponent;
  let fixture: ComponentFixture<ConfirmEndTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmEndTournamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEndTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
