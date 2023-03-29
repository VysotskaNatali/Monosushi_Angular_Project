import {Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword} from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  public userForm!: FormGroup;
  public isAddress = false;
  public user!: any;
  public userInfoSubscription!: Subscription | null;
  
  constructor(
    public fb: FormBuilder,
    private accountService: AccountService,
    private afs: Firestore,
    private toastr: ToastrService,
    private auth: Auth,
    ) {
      // this.userInfoSubscription = this.accountService.isUserUpdate$ .subscribe(
      //   () => {
      //     this.updateUserData();
      //     this.toastr.info('user data update');
      //   });
     }

  ngOnInit(): void {
    this.inituserForm();
    this.userData();
    this.updateUser();
  }

  inituserForm(): void {
    this.userForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      firstN: [null, [Validators.required, Validators.minLength(2)]],
      lastN: [null, [Validators.required, Validators.minLength(2)]],
      phone: [null, [Validators.required, Validators.minLength(10)]],
      address: [null, [Validators.required]],
    });
  }
  userData():void{
    if (localStorage.length > 0 && localStorage.getItem('currentUser')) {
    this.user = JSON.parse(localStorage.getItem('currentUser') as string);
    
    this.userForm.patchValue({
      email: this.user.email,
      firstN: this.user.firstName,
      lastN: this.user.lastName,
      phone: this.user.phoneNumber,
      address: this.user.address,
    });
    }
  }
  updateUser(): void {
    this.accountService.userData$.subscribe(() => {
      this.userData()
    });
  }

  updateUserData(): void {
    const { email, firstN, lastN, phone, address} = this.userForm.value;
    const user = {
      address:address,
      email: email,
      firstName:firstN,
      lastName:lastN,
      phoneNumber:phone,
      orders: [],
      infoOrder:[],
      role: 'USER',
    }
   this.accountService.updateUserFirebase(user,this.user.uid)
   this.accountService.isUserLogin$.next(true);
   this.accountService.userData$.next(true);
   localStorage.setItem("currentUser", JSON.stringify(user))
   this.toastr.info('Дані користувача оновлено');
  }
 
}
