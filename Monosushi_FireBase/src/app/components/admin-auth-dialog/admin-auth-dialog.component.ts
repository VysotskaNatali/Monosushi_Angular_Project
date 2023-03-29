import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constans/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-admin-auth-dialog',
  templateUrl: './admin-auth-dialog.component.html',
  styleUrls: ['./admin-auth-dialog.component.scss'],
})
export class AdminAuthDialogComponent implements OnInit {
  public authForm!: FormGroup;
  public loginSubcription!: Subscription;

  constructor(
    public fb: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.login(email, password)
      .then(() => {
        this.toastr.info('Вітаю у вашому кабінеті');
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
        const currentUser = { ...user, uid: credential.user.uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        if (user && user['role'] === ROLE.ADMIN) {
          this.router.navigate(['/admin']);
        }
        this.accountService.isUserLogin$.next(true);
      },
      (e) => {
        console.log('error', e);
      }
    );
  }
}
