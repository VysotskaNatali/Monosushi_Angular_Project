import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { of } from 'rxjs';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change product count', () => {
    const boolean = true;
    const Fake_Product = {
      id: 1,
      category: { id: 1, name: 'qqq', path: 'qqq', imagePath: 'iqq' },
      name: 'qqq',
      path: 'qqq',
      description: 'qqq',
      weight: 10,
      price: 10,
      imagePath: 'qqq',
      count: 1,
    };
    spyOn(component, 'productCount').and.callThrough();
    component.productCount(Fake_Product, boolean);
    expect(component.productCount).toHaveBeenCalled();
    expect(Fake_Product.count).toBe(2);
  });

  it('should addBasket', () => {
    const product = {
      id: 1,
      category: { id: 1, name: 'qqq', path: 'qqq', imagePath: 'iqq' },
      name: 'qqq',
      path: 'qqq',
      description: 'qqq',
      weight: 10,
      price: 10,
      imagePath: 'qqq',
      count: 1,
    };
    spyOn(component, 'addToBasket').and.callThrough();
    component.addToBasket(product);
    expect(component.addToBasket).toHaveBeenCalled();
    expect(product.count).toBe(1);
  });
});
