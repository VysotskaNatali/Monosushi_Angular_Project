import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  collectionData,
  CollectionReference,
  doc,
  docData,
  DocumentReference,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  DocumentData,
} from '@firebase/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IProductRequest,
  IProductResponse,
} from '../../interfaces/product/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };
  private productCollection!: CollectionReference<DocumentData>;

  constructor(private http: HttpClient, private afs: Firestore) {
    this.productCollection = collection(this.afs, 'products');
  }
  async getAllByCategoryFirebase(name: string) {
    const arr: DocumentData[] = [];
    const category = query(
      collection(this.afs, 'products'),
      where('category.path', '==', `${name}`)
    );
    const querySnapshot = await getDocs(category);
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    return arr;
  }
  
  createFirebase(product: IProductResponse): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.productCollection, product);
  }

  getAllFirebase() {
    return collectionData(this.productCollection, { idField: 'id' });
  }


  getOneFirebase(id: string) {
    return docData(doc(this.afs, `products/${id}`), { idField: 'id' });
  }

  updateFirebase(product: IProductRequest, id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReference, { ...product });
  }

  deleteFirebase(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReference);
  }
}
