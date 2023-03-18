import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { Router } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss'],
})
export class OrderProductComponent implements OnInit {
  public basketArray: Array<IProductResponse> = [];
  public orderInfoForm!: FormGroup;
  public userForm!: FormGroup;
  public total = 0;
  public countBasket = 0;

  //----------google map-----//

  public myLatLng = { lat: 49.8632811, lng: 24.0167166 }; // Map Options
  public mapOptions: google.maps.MapOptions = {
    center: this.myLatLng,
    zoom: 12,
  };

  public poligonGreen: google.maps.PolygonOptions = {
    strokeColor: '#1b5f37',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#27ae60',
    fillOpacity: 0.35,
  };

  public poligonYellow: google.maps.PolygonOptions = {
    strokeColor: '#c0930d',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#f2c94c',
    fillOpacity: 0.35,
  };

  public greenZone = [
    { lat: 49.86256702238861, lng: 23.924706101953124 },
    { lat: 49.854156365036, lng: 23.97071135097656 },
    { lat: 49.85150006381572, lng: 24.0222097640625 },
    { lat: 49.86522271529407, lng: 24.13001310878906 },
    { lat: 49.890444516994755, lng: 24.05791533046875 },
    { lat: 49.88557817764303, lng: 23.961784959375 },
  ];
  public yellowZone = [
    { lat: 49.860932211747915, lng: 23.92401945644531 },
    { lat: 49.853563854767025, lng: 23.97071135097656 },
    { lat: 49.849938001736184, lng: 24.022293090820312 },
    { lat: 49.86409847249427, lng: 24.13089908693271 },
    { lat: 49.84840086119549, lng: 24.15473234707031 },
    { lat: 49.82138511221069, lng: 24.123146653710936 },
    { lat: 49.828472670483464, lng: 24.0112234359375 },
    { lat: 49.81030872352647, lng: 23.936379075585936 },
    { lat: 49.8315731507048, lng: 23.867027879296874 },
  ];

  public greenZone1 = [
    { lat: 49.80919365897199, lng: 23.93629193606126 },
    { lat: 49.82747390885222, lng: 24.011566758691405 },
    { lat: 49.82025984952131, lng: 24.122974992333983 },
    { lat: 49.79036483465222, lng: 24.142372727929686 },
    { lat: 49.76376020288653, lng: 24.06684172207031 },
    { lat: 49.76198604140805, lng: 23.983070970117186 },
  ];

  public markerOptions: google.maps.MarkerOptions = {
    icon: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi-dotless.png',
    title: `Monosushi`,
  };

  public spots: { id: number; lat: number; lng: number }[] = [
    { id: 1, lat: 49.8632811, lng: 24.0167166 },
    { id: 2, lat: 49.8099415, lng: 24.010391 },
  ];

  constructor(
    private orderService: OrderService,
    public fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    public google: GoogleMapsModule,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.initUserForm();
    this.userData();
    this.updateUser();
    this.initOrderInfoForm();
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

  //------------------------------

  initOrderInfoForm(): void {
    this.orderInfoForm = this.fb.group({
      holders: [null, [Validators.required]],
      countHolders: [null, [Validators.required]],
      delivery: [null, [Validators.required]],
      cash: [null, [Validators.required]],
      callBack: false,
    });
  }
  initUserForm(): void {
    this.userForm = this.fb.group({
      firstN: [null, [Validators.required, Validators.minLength(2)]],
      lastN: [null, [Validators.required, Validators.minLength(2)]],
      phone: [null, [Validators.required, Validators.minLength(10)]],
      address: [null, [Validators.required]],
    });
  }
  orderProduct() {
    if (this.basketArray.length > 0) {
      console.log(this.basketArray, this.orderInfoForm.value);
      this.basketArray = [];
      localStorage.setItem('basket', JSON.stringify(this.basketArray));
      this.updateBasket();
      this.orderService.changeBasket.next(true);
      localStorage.removeItem('basket');
      this.orderInfoForm.reset();
      this.router.navigate(['/cabinet/orderHistory']);
    } else {
      this.router.navigate(['/home']);
    }
  }
  userData(): void {
    if (localStorage.length > 0 && localStorage.getItem('currentUser')) {
      const { firstName, lastName, email, phoneNumber, address } = JSON.parse(
        localStorage.getItem('currentUser') as string
      );
      this.userForm.patchValue({
        firstN: firstName,
        lastN: lastName,
        phone: phoneNumber,
        address: address,
      });
    }
  }
  updateUser(): void {
    this.accountService.userData$.subscribe(() => {
      this.userData();
    });
  }

  //-------------google maps---------
  selectMarker(spot: { id: number; lat: number; lng: number }) {
    if (spot.id == 1) {
      this.toastr.info(
        `проспект В'ячеслава Чорновола, 95, Львів, Львівська область, 79000`
      );
    }
    if (spot.id == 2) {
      this.toastr.info(
        `вул. Володимира Великого, 10в, Львів, Львівська область, 79000`
      );
    }
  }
  moveMap(event: google.maps.MapMouseEvent) {
    console.log(event.latLng.toJSON());
  }
}
