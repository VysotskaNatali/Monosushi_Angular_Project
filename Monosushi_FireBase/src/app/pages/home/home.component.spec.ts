import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['getAll']);
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [ MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProduct', () => {
    spyOn(component, 'loadProduct');
    component.ngOnInit();
    expect(component.loadProduct).toHaveBeenCalled();
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

  it('should be addBasket', () => {
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
