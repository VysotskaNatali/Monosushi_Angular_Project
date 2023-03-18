import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { DeliveryComponent } from './delivery.component';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [DeliveryComponent],
  imports: [
    CommonModule,
    SharedModule,
    DeliveryRoutingModule,
    ToastrModule.forRoot(),
  ],
})
export class DeliveryModule {}
