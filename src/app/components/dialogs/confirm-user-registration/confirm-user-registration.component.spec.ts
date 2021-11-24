import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmUserRegistrationComponent} from './confirm-user-registration.component';

describe('ConfirmUserRegistrationComponent', () => {
  let component: ConfirmUserRegistrationComponent;
  let fixture: ComponentFixture<ConfirmUserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmUserRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmUserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
