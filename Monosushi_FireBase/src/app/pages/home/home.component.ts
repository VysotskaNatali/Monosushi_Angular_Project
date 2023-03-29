import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public hide = false;
  public userProducts: Array<IProductResponse> = [];
  public discounts: Array<IDiscountResponse> = [];
  public time = new Date().getHours();

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private discountService: DiscountService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    this.loadDiscounts();
    this.openWarningDialog();
  }

  loadDiscounts(): void {
    this.discountService.getAllFirebase().subscribe((data) => {
      this.discounts = data as IDiscountResponse[];
    });
  }

  loadProduct(): void {
    this.productService.getAllFirebase().subscribe((data) => {
      this.userProducts = data as IProductResponse[];
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
        console.log(typeof basket[index].count);
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
  openWarningDialog(): void {
    if (this.time < 11 || this.time > 21) {
      this.dialog.open(WarningDialogComponent, {
        backdropClass: 'warning-back',
        panelClass: 'warning-dialog',
        autoFocus: false,
      });
    }
  }
}
