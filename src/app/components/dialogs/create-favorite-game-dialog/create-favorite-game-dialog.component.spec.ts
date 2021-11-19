import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFavoriteGameDialogComponent } from './create-favorite-game-dialog.component';

describe('CreateFavoriteGameDialogComponent', () => {
  let component: CreateFavoriteGameDialogComponent;
  let fixture: ComponentFixture<CreateFavoriteGameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFavoriteGameDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFavoriteGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
