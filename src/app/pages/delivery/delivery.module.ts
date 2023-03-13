import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryComponent } from './delivery.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [DeliveryComponent],
  imports: [
    CommonModule,
    SharedModule,
    DeliveryRoutingModule,
    GoogleMapsModule,
    ToastrModule.forRoot(),
  ],
})
export class DeliveryModule {}
