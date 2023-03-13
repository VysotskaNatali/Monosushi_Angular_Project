import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountComponent } from './discount.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DiscountService} from "../../shared/services/discount/discount.service";

describe('DiscountComponent', () => {
  let component: DiscountComponent;
  let fixture: ComponentFixture<DiscountComponent>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DiscountService', ['getAll']);
    await TestBed.configureTestingModule({
      declarations: [ DiscountComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadDiscount', () => {
    spyOn(component, 'loadDiscount');
    component.ngOnInit();
    expect(component.loadDiscount).toHaveBeenCalled();
  });

});
