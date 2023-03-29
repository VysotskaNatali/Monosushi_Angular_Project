import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {
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
