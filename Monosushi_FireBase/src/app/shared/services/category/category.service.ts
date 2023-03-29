import { Injectable } from '@angular/core';
import { collectionData, CollectionReference, doc, DocumentReference, Firestore, updateDoc } from '@angular/fire/firestore';
import {  addDoc, collection, deleteDoc, DocumentData } from '@firebase/firestore';
import { ICategoryRequest } from '../../interfaces/category/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  
  private categotyCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
    ) {
      this.categotyCollection = collection(this.afs, 'categories')
    }

    createFirebase(category: ICategoryRequest):Promise<DocumentReference<DocumentData>>{
      return addDoc(this.categotyCollection, category)
    }

    getAllFirebase(){
      return collectionData(this.categotyCollection, {idField:'id'})
    }

    updateFirebase( category: ICategoryRequest, id: string){
     const categoryDocumentReference = doc(this.afs, `categories/${id}`);
     return updateDoc(categoryDocumentReference , {...category})
    }
  
    deleteFirebase(id:string){
      const categoryDocumentReference = doc(this.afs, `categories/${id}`);
      return deleteDoc(categoryDocumentReference)
    }
  

}
