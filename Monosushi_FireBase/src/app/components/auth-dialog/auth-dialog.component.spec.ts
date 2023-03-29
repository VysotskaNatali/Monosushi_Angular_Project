import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDialogComponent } from './auth-dialog.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { Auth } from "@angular/fire/auth";
import { Firestore } from "@angular/fire/firestore";
import { ToastrService } from 'ngx-toastr';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthDialogComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize admin auth form', () => {
    expect(component.authForm.value).toEqual({email: null, password: null});
  });

  it('should initialize register form', () => {
    expect(component.registForm.value).toEqual({email: null, password: null,
      repassword:null,firstN:null,lastN:null,phone:null,checked:null});
  });

  it('should set checkError to true when passwords do not match', () => {
    const passwordControl = component.registForm.controls['password'];
    const repasswordControl = component.registForm.controls['repassword'];
    passwordControl.setValue('password');
    repasswordControl.setValue('password1');
    expect(component.checkError).toBeTrue();
  });

  it('should set checkError to false when passwords match', () => {
    const passwordControl = component.registForm.controls['password'];
    const repasswordControl = component.registForm.controls['repassword'];
    passwordControl.setValue('password');
    repasswordControl.setValue('password');
    expect(component.checkError).toBeFalse();
  });


});
