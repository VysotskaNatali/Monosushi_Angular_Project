import { Component, OnInit } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constans/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-auth-dialog ',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent implements OnInit {
  public authForm!: FormGroup;
  public registForm!: FormGroup;
  public loginSubcription!: Subscription;
  public isLogin = true;
  public hide = true;
  public checkError = false;

  constructor(
    public fb: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AuthDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initAuthForm();
    this.initRegistForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?!.*admin)[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
          ),
        ],
      ],
      password: [null, [Validators.required]],
    });
  }

  initRegistForm(): void {
    this.registForm = this.fb.group(
      {
        email: [
          null,
          [
            Validators.required,
            Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i),
          ],
        ],
        password: [null, [Validators.required, Validators.minLength(6)]],
        repassword: [null, [Validators.required, Validators.minLength(6)]],
        firstN: [null, [Validators.required, Validators.minLength(2)]],
        lastN: [null, [Validators.required, Validators.minLength(2)]],
        phone: [
          null,
          [
            Validators.required,
            Validators.pattern(
              /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/
            ),
          ],
        ],
        checked: [null, [Validators.required]],
      },
      { validators: this.validPassword('password', 'repassword') }
    );
  }

  // My confirm password validation
  validPassword(password: any, repassword: any) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const repassControl = formGroup.controls[repassword];
      if (repassControl.errors && repassControl.errors['validPassword']) {
        return;
      }
      if (passControl.value !== repassControl.value) {
        repassControl.setErrors({ validPassword: true });
        this.checkError = true;
      } else {
        repassControl.setErrors(null);
        this.checkError = false;
      }
    };
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password)
      .then(() => {
        this.toastr.info('Вітаю у вашому кабінеті');
        this.dialogRef.close();
      })
      .catch((e) => {
        this.toastr.error('Помилка логінування!', e.message);
      });
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    this.loginSubcription = docData(
      doc(this.afs, 'users', credential.user.uid)
    ).subscribe(
      (user) => {
        if (user && user['role'] === ROLE.USER) {
          this.router.navigate(['/cabinet']);
          const currentUser = { ...user, uid: credential.user.uid };
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        
        this.accountService.isUserLogin$.next(true);
        this.accountService.userData$.next(true);
      },
      (e) => {
        console.log('error', e);
      }
    );
  }

  registerUser(): void {
    const { email, password, firstN, lastN, phone, checked } =
      this.registForm.value;
    this.emailSignUp(email, password, firstN, lastN, phone)
      .then(() => {
        this.toastr.info('Вітаю ви зареєстровані!');
        this.isLogin = !this.isLogin;
        this.registForm.reset();
        this.dialogRef.close();
      })
      .catch((e) => {
        this.toastr.error('Помилка реєстрації!', e.message);
      });

  }

  async emailSignUp(
    email: string,
    password: string,
    firstN: string,
    lastN: string,
    phone: string
  ): Promise<any> {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user = {
      email: credential.user.email,
      firstName: firstN,
      lastName: lastN,
      phoneNumber: phone,
      address: '',
      orders: [],
      infoOrder:[],
      role: 'USER',
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }
}
