import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


interface Trip {
  _id: number;
  departure: string;
  arrival: string;
  date: string;
  price: number;
  seats: number;
  description: string;
}

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnInit {
  trips: any[] = [];
  pastTrips: any[] = [];

  constructor(private apiService: ApiService) { }

  public formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }

  ngOnInit(): void {
    this.apiService.getTrips().subscribe(
      (data: Trip[]) => {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        this.trips = data.filter(trip => new Date(trip.date) >= date);
        this.pastTrips = data.filter(trip => new Date(trip.date) < date);
        // format dates for display
        this.trips.forEach(trip => {
          trip.date = this.formatDate(trip.date);
        });

        this.pastTrips.forEach(trip => {
          trip.date = this.formatDate(trip.date);
        });
      }
    );
  }
}
