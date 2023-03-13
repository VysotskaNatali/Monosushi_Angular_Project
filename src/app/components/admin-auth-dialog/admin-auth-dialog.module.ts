import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthDialogRoutingModule } from './admin-auth-dialog-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminAuthDialogComponent } from './admin-auth-dialog.component';
@NgModule({
  declarations: [AdminAuthDialogComponent],
  imports: [CommonModule, AdminAuthDialogRoutingModule, SharedModule],
})
export class AdminAuthDialogModule {}
