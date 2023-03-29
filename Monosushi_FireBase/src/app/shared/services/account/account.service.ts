import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { ILogin, IUser } from 'src/app/shared/interfaces/account/acount.interface';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public isUserLogin$ = new Subject<boolean>();
  public userData$ = new Subject<boolean>();
  public isUserUpdate$ = new Subject<boolean>();

  constructor(private http: HttpClient, private afs: Firestore) {}

  updateUserFirebase(userInfo: IUser, id: string) {
    return updateDoc(doc(this.afs, `users/${id}`), { ...userInfo });
  }
}
