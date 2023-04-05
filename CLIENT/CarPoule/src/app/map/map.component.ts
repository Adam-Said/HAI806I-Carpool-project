import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

type LatLngTuple = [number, number];

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() departureCoords: number[] = [0, 0];
  @Input() arrivalCoords: number[] = [0, 0];
  private map: any;

  ngOnInit() {
    const latlngs = [
      L.latLng(this.departureCoords[0], this.departureCoords[1]),
      L.latLng(this.arrivalCoords[0], this.arrivalCoords[1])
    ];

    this.map = L.map('map');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.map);

    L.marker(latlngs[0]).addTo(this.map);
    L.marker(latlngs[1]).addTo(this.map);

    L.polyline(latlngs).addTo(this.map);

    // Fit the map bounds to the polyline
    const bounds = L.latLngBounds(latlngs);
    this.map.fitBounds(bounds, { padding: [20, 20] });
  }


}
