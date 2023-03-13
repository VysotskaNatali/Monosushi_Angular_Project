import {Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  public userForm!: FormGroup;
  public isAddress = false;
  
  constructor(
    public fb: FormBuilder,
    private accountService: AccountService,
    ) { }

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
    const {firstName,lastName,email,phoneNumber,address} = JSON.parse(localStorage.getItem('currentUser') as string);
    this.userForm.patchValue({
      email: email,
      firstN: firstName,
      lastN: lastName,
      phone: phoneNumber,
      address: address,
    });
    }else if(localStorage.length == 0){
      this.userForm.patchValue({
        email: '',
        firstN: '',
        lastN: '',
        phone: '',
        address: '',
      });
    }
  }
  updateUser(): void {
    this.accountService.userData$.subscribe(() => {
      this.userData()
    });
  }

  saveAddress():void{
    
  }
}
