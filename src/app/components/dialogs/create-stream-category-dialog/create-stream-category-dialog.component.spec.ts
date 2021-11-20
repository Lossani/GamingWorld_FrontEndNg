import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStreamCategoryDialogComponent } from './create-stream-category-dialog.component';

describe('CreateStreamCategoryDialogComponent', () => {
  let component: CreateStreamCategoryDialogComponent;
  let fixture: ComponentFixture<CreateStreamCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStreamCategoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStreamCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
