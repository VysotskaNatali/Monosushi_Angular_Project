import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountComponent } from './admin-discount.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Storage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { IDiscountResponse } from '../../shared/interfaces/discount/discount.interface';

describe('AdminDiscountComponent', () => {
  let component: AdminDiscountComponent;
  let fixture: ComponentFixture<AdminDiscountComponent>;

  let discounts: IDiscountResponse[] = [
    {
      name: 'qqq',
      title: 'qqq',
      description: 'qqq',
      imagePath: 'iqq',
      data: 'qqq',
      id: 1,
    },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DiscountService', ['getAll']);
    await TestBed.configureTestingModule({
      declarations: [AdminDiscountComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadDiscount', () => {
    spyOn(component, 'loadDiscounts');
    component.ngOnInit();
    expect(component.loadDiscounts).toHaveBeenCalled();
  });

  it('should set form values when editing a discount', () => {
    const discount: IDiscountResponse = discounts[0];
    component.editDiscount(discount);
    expect(component.isUploaded).toBe(true);
    expect(component.editStatus).toBe(true);
    expect(component.showForm).toBe(false);
  });

  it('should set form values when save a discount', () => {
    component.saveDiscount();
    expect(component.isUploaded).toBe(false);
    expect(component.editStatus).toBe(false);
    expect(component.showForm).toBe(true);
  });

  it('should set form values when delete a discount', () => {
    const discount: IDiscountResponse = discounts[0];
    component.deleteDiscount(discount);
    expect(component.loadDiscounts).toBeTruthy();
  });
});
