import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMembersDialogComponent } from './add-members-dialog.component';

describe('AddMembersDialogComponent', () => {
  let component: AddMembersDialogComponent;
  let fixture: ComponentFixture<AddMembersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMembersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMembersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
