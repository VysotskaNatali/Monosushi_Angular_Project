import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ROLE } from 'src/app/shared/constans/role.constant';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';
import { PhoneDataDialogComponent } from '../phone-data-dialog/phone-data-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public headerCategory: Array<ICategoryResponse> = [];
  public basketArray: Array<IProductResponse> = [];
  public total = 0;
  public countBasket = 0;
  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';
  public menu = false;
  public active = false;

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategory();
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdateUserLogin();
  }

  menuToggle(): void {
    this.menu = !this.menu;
    this.active = !this.active;
  }

  loadCategory(): void {
    this.categoryService.getAllFirebase().subscribe((data) => {
      this.headerCategory = data as ICategoryResponse[];
    });
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

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }

  checkUserLogin(): void {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Admin💙 ';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet';
      this.loginPage = 'Cabinet';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }

  checkUpdateUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    });
  }

  openPhoneDialog(): void {
    this.dialog.open(PhoneDataDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false,
    });
  }

  openLoginDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false,
      position: {
        top: '100px',
      },
    });
  }

  openBasketDialog(): void {
    this.dialog.open(BasketDialogComponent, {
      backdropClass: 'basket-back',
      panelClass: 'basket-dialog',
      autoFocus: false,
    });
  }
}
