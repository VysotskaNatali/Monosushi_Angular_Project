import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { UserDataComponent } from './user-data/user-data.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  {
    path: '',
    component: CabinetComponent,
    children: [
      { path: 'userData', component: UserDataComponent },
      { path: 'orderHistory', component: OrderHistoryComponent },
      { path: 'changePassword', component: ChangePasswordComponent },
      
      { path: '', pathMatch: 'full', redirectTo: 'userData' },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabinetRoutingModule {}
