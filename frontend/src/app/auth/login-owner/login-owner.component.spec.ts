import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOwnerComponent } from './login-owner.component';

describe('LoginOwnerComponent', () => {
  let component: LoginOwnerComponent;
  let fixture: ComponentFixture<LoginOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
