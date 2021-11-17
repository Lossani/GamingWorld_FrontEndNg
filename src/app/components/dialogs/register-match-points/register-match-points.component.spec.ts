import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMatchPointsComponent } from './register-match-points.component';

describe('RegisterMatchPointsComponent', () => {
  let component: RegisterMatchPointsComponent;
  let fixture: ComponentFixture<RegisterMatchPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterMatchPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMatchPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
