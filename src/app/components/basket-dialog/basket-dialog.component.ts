import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.scss'],
})
export class BasketDialogComponent implements OnInit {
  public basketArray: Array<IProductResponse> = [];
  public total = 0;
  public countBasket = 0;

  constructor(
    private orderService: OrderService,
    private dialogRef: MatDialogRef<BasketDialogComponent>
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basketArray = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basketArray.reduce(
      (total: number, prod: IProductResponse) =>
        total + prod.count * prod.price,
      0
    );
    this.countBasket = this.basketArray.length;
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
      localStorage.setItem('basket', JSON.stringify(this.basketArray));
    } else if (!value && product.count > 1) {
      --product.count;
      localStorage.setItem('basket', JSON.stringify(this.basketArray));
    }
    this.updateBasket();
    this.orderService.changeBasket.next(true);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }

  deleteBasketProduct(product: IProductResponse): void {
    if (this.basketArray.some((prod) => prod.id === product.id)) {
      const index = this.basketArray.findIndex(
        (prod) => prod.id === product.id
      );
      this.basketArray.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(this.basketArray));
      this.updateBasket();
      this.orderService.changeBasket.next(true);
    }
  }
  orderProduct(): void {
    this.dialogRef.close();
    this.basketArray = [];
    localStorage.setItem('basket', JSON.stringify(this.basketArray));
    this.updateBasket();
    this.orderService.changeBasket.next(true);
    localStorage.removeItem('basket');
  }
}
