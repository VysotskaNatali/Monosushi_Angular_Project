import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DiscountRoutingModule } from './discount-routing.module';
import { DiscountInfoComponent } from './discount-info/discount-info.component';
import { DiscountComponent } from './discount.component';

@NgModule({
  declarations: [DiscountComponent, DiscountInfoComponent],
  imports: [CommonModule, SharedModule, DiscountRoutingModule],
})
export class DiscountModule {}
