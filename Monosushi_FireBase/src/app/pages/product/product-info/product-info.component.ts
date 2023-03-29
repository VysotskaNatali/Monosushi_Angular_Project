import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  public currentProduct = {
    category:{
      name: 'Loading..',
      path: 'Loading..',
      imagePath: 'Loading..',
      id: 'Loading..',
    },
    name: 'Loading..',
    path: 'Loading..',
    description: 'Loading..',
    weight: 0,
    price: 0,
    imagePath: 'Loading..',
    count: 0,
    id: 'Loading..',
  }
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getOneProduct();
  }

  getOneProduct() {
    const product_ID = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService
      .getOneFirebase(product_ID as string)
      .subscribe((data) => {
        this.currentProduct = data as IProductResponse;
      });
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some((prod) => prod.id === product.id)) {
        const index = basket.findIndex((prod) => prod.id === product.id);
        basket[index].count =
          Number(basket[index].count) + Number(product.count);
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }
}
