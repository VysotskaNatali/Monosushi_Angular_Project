import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public passwordForm!: FormGroup;
  public hide = true;
  public checkError = false;
  public checkPassword = false;

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.initPasswordForm();
  }

  initPasswordForm(): void {
    this.passwordForm = this.fb.group(
      {
        oldpassword: [null, [Validators.required, Validators.minLength(6)]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        repassword: [null, [Validators.required, Validators.minLength(6)]],
      },
      { validators: this.validPassword('password', 'repassword') }
    );
  }

  // My confirm password validation
  validPassword(password: any, repassword: any) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const repassControl = formGroup.controls[repassword];

      if (passControl.value !== repassControl.value) {
        repassControl.setErrors({ validPassword: true });
        this.checkError = true;
      } else {
        repassControl.setErrors(null);
        this.checkError = false;
      }
    };
  }

  cancelBtn(): void {
    this.passwordForm.reset();
  }

  saveBtn() {}
}
