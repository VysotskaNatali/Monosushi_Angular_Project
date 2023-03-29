import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { collectionData, CollectionReference, doc, docData, DocumentReference, Firestore, updateDoc } from '@angular/fire/firestore';
import {  addDoc, collection, deleteDoc, DocumentData } from '@firebase/firestore';
import {
  IDiscountRequest,
  IDiscountResponse,
} from '../../interfaces/discount/discount.interface';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {

  private discountCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore
    ) {this.discountCollection = collection(this.afs, 'discounts')}

    createFirebase(discount: IDiscountResponse):Promise<DocumentReference<DocumentData>>{
      return addDoc(this.discountCollection, discount)
    }

    getAllFirebase(){
      return collectionData(this.discountCollection, {idField:'id'})
    }

    getOneFirebase(id:string){
      const discountDocumentReference = doc(this.afs, `discounts/${id}`);
      return docData(discountDocumentReference,{idField:'id'} );
    }

    updateFirebase( discount: IDiscountRequest, id: string){
      const discountDocumentReference = doc(this.afs, `discounts/${id}`);
      return updateDoc(discountDocumentReference , {...discount})
     }

     deleteFirebase(id:string){
      const discountDocumentReference = doc(this.afs, `discounts/${id}`);
      return deleteDoc(discountDocumentReference)
    }
}
