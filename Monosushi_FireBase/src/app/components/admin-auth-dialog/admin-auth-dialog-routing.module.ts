import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthDialogComponent } from './admin-auth-dialog.component';

const routes: Routes = [{ path: '', component: AdminAuthDialogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAuthDialogRoutingModule {}
