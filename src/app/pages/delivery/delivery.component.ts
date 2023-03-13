import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
  myLatLng = { lat: 49.8632811, lng: 24.0167166 }; // Map Options
  mapOptions: google.maps.MapOptions = {
    center: this.myLatLng,
    zoom: 10,
  };

  markerOptions: google.maps.MarkerOptions = {
    icon: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi-dotless.png',
    title: `Monosushi`,
  };

  spots: { id: number; lat: number; lng: number }[] = [
    { id: 1, lat: 49.8632811, lng: 24.0167166 },
    { id: 2, lat: 49.8099415, lng: 24.010391 },
  ];

  constructor(private toastr: ToastrService, public google: GoogleMapsModule) {}

  ngOnInit(): void {}

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
}
