import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CallOrderComponent } from '../call-order/call-order.component';

@Component({
  selector: 'app-phone-data-dialog',
  templateUrl: './phone-data-dialog.component.html',
  styleUrls: ['./phone-data-dialog.component.scss'],
})
export class PhoneDataDialogComponent implements OnInit {
  public phoneForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<PhoneDataDialogComponent>
    ) {}

  ngOnInit(): void {
    this.initPhoneForm();
  }

  initPhoneForm(): void {
    this.phoneForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/
          ),
        ],
      ],
    });
  }

  callOrderDialog(): void {
    this.dialog.open(CallOrderComponent, {
      backdropClass: 'call-back',
      panelClass: 'call-dialog',
      autoFocus: false,
    });
    this.dialogRef.close();
  }
}
