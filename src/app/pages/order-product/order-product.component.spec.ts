import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductComponent } from './order-product.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

describe('OrderProductComponent', () => {
  let component: OrderProductComponent;
  let fixture: ComponentFixture<OrderProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProductComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
