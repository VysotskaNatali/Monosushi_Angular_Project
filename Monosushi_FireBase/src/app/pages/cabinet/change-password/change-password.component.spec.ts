import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the password form', () => {
    expect(component.passwordForm.value).toEqual({
      oldpassword: null,
      password: null,
      repassword: null,
    });
    expect(component.passwordForm).toBeDefined();
  });

  it('should set checkError to true when passwords do not match', () => {
    const passwordControl = component.passwordForm.controls['password'];
    const repasswordControl = component.passwordForm.controls['repassword'];
    passwordControl.setValue('password');
    repasswordControl.setValue('password1');
    expect(component.checkError).toBeTrue();
  });

  it('should set checkError to false when passwords match', () => {
    const passwordControl = component.passwordForm.controls['password'];
    const repasswordControl = component.passwordForm.controls['repassword'];
    passwordControl.setValue('password');
    repasswordControl.setValue('password');
    expect(component.checkError).toBeFalse();
  });
});
