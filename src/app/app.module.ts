import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { SharedModule } from './shared/shared.module';

import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { BasketDialogComponent } from './components/basket-dialog/basket-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PhoneDataDialogComponent } from './components/phone-data-dialog/phone-data-dialog.component';
import { CallOrderComponent } from './components/call-order/call-order.component';
import { OrderProductComponent } from './pages/order-product/order-product.component';

@NgModule({
  declarations: [
    AppComponent,

    AuthDialogComponent,
    BasketDialogComponent,
    FooterComponent,
    HeaderComponent,
    PhoneDataDialogComponent,
    CallOrderComponent,
    OrderProductComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
