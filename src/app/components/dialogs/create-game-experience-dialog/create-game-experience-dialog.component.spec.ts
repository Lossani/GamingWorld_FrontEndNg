import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateGameExperienceDialogComponent} from './create-game-experience-dialog.component';

describe('CreateGameExperienceDialogComponent', () => {
  let component: CreateGameExperienceDialogComponent;
  let fixture: ComponentFixture<CreateGameExperienceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGameExperienceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameExperienceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
