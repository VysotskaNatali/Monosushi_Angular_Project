import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { IProductResponse } from '../../shared/interfaces/product/product.interface';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
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
