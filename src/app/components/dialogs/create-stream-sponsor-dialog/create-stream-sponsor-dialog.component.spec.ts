import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateStreamSponsorDialogComponent} from './create-stream-sponsor-dialog.component';

describe('CreateStreamSponsorDialogComponent', () => {
  let component: CreateStreamSponsorDialogComponent;
  let fixture: ComponentFixture<CreateStreamSponsorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStreamSponsorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStreamSponsorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
