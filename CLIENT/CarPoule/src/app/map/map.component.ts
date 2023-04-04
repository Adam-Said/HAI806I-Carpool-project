import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

type LatLngTuple = [number, number];

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() departureCoords: LatLngTuple = [51.505, -0.09];
  @Input() arrivalCoords: LatLngTuple = [51.505, -0.09];
  private map: any;

  ngOnInit() {

    const departure: LatLngTuple = this.departureCoords;
    const arrival: LatLngTuple = this.arrivalCoords;

    this.map = L.map('map').setView(this.departureCoords, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.map);

    L.marker(this.departureCoords).addTo(this.map);
    L.marker(this.arrivalCoords).addTo(this.map);

    L.polyline([this.departureCoords, this.arrivalCoords]).addTo(this.map);
  }

}
