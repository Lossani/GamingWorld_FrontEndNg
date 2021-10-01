import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumInformationDialogComponent } from './premium-information-dialog.component';

describe('PremiumInformationDialogComponent', () => {
  let component: PremiumInformationDialogComponent;
  let fixture: ComponentFixture<PremiumInformationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumInformationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
