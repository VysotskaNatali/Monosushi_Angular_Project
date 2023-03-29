import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './cabinet.component';
import { UserDataComponent } from './user-data/user-data.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

@NgModule({
  declarations: [
    CabinetComponent,
    UserDataComponent,
    ChangePasswordComponent,
    OrderHistoryComponent,
  ],
  imports: [CommonModule, SharedModule, CabinetRoutingModule],
})
export class CabinetModule {}
