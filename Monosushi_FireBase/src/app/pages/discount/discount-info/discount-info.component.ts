import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss'],
})
export class DiscountInfoComponent implements OnInit {
  public currentDiscount = {
    name: 'Loading...',
    title: 'Loading...',
    description: 'Loading...',
    imagePath: 'Loading...',
    data: 'Loading...',
    id: 'Loading...',
  };

  constructor(
    private discountService: DiscountService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOneDiscount();
  }

  getOneDiscount() {
    const discount_ID = this.activatedRoute.snapshot.paramMap.get('id');
    this.discountService
      .getOneFirebase(discount_ID as string)
      .subscribe((data) => {
        this.currentDiscount = data as IDiscountResponse;
      });
  }
}
