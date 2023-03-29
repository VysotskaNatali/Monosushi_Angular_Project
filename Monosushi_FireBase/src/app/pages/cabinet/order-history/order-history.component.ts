import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  public table = [
    {
      num: 441,
      data: '25.12.2022',
      address: 'вул. Городоцька 82',
      sum: '232 грн',
      status: true,
      product: 'Філадельфія з лососем',
      count: '1',
    },
    {
      num: 158,
      data: '02.02.2023',
      address: 'вул. Городоцька 82',
      sum: '950 грн',
      status: false,
      product: 'Сет Філадельфія',
      count: '1',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
