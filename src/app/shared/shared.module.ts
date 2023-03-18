import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

const MATERIAL = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatBadgeModule,
  MatGridListModule,
  MatCheckboxModule,
  MatSelectModule,
  MatRadioModule,
];

import { ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [],
  imports: [...MATERIAL, ReactiveFormsModule, SwiperModule, GoogleMapsModule],
  exports: [...MATERIAL, ReactiveFormsModule, SwiperModule, GoogleMapsModule],
  providers: [],
})
export class SharedModule {}
