import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketDialogComponent } from './basket-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';

describe('BasketDialogComponent', () => {
  let component: BasketDialogComponent;
  let fixture: ComponentFixture<BasketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketDialogComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should change total', () => {
    const FAKE_BASKET: IProductResponse[] = [
      {
        id: 1,
        category: { id: 1, name: 'qqq', path: 'qqq', imagePath: 'iqq' },
        name: 'qqq',
        path: 'qqq',
        description: 'qqq',
        weight: 10,
        price: 10,
        imagePath: 'qqq',
        count: 1,
      },
    ];
    component.basketArray = FAKE_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();

    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(10);
    component.basketArray = [];
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });
});
