import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryComponent } from './delivery.component';
import { ToastrService } from 'ngx-toastr';
import { GoogleMapsModule } from '@angular/google-maps';

describe('DeliveryComponent', () => {
  let component: DeliveryComponent;
  let fixture: ComponentFixture<DeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryComponent],
      providers: [
        { provide: ToastrService, useValue: {} },
        { provide: GoogleMapsModule, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
