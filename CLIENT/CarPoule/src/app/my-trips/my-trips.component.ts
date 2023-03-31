import { Component } from '@angular/core';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent {
  trips = [
    {
      title: 'Montpellier - Toulouse',
      date: "27/03/2022",
      passenger: "3",
      driverName: "John Doe",
      price: "100",
      status: 'Driver',
      description: 'J\étais en train de me lécher le cul quand d\'un coup j\'ai'
    },
    {
      title: 'Marseille - Salon de Provence',
      date: "27/03/2022",
      passenger: "3",
      driverName: "John Doe",
      price: "100",
      status: 'Passenger',
      description: 'This is the description for trip 2'
    },
    {
      title: 'Manosque - Marseille',
      date: "27/03/2022",
      passenger: "3",
      price: "100",
      status: 'Passenger',
      driverName: "John Doe",
      description: 'This is the description for trip 3'
    }
  ];

  futureTrips = [
    {
      title: 'Montpellier - Nîmes',
      date: "27/03/2022",
      passenger: "3",
      driverName: "John Doe",
      approved: "0",
      price: "100",
      state: 'Waiting for approval',
      status: 'Driver',
      description: 'J\étais en train de me lécher le cul quand d\'un coup j\'ai'
    },
    {
      title: 'Montpellie - Marseille',
      date: "27/03/2022",
      passenger: "32",
      driverName: "John Doe",
      approved: "1",
      price: "98",
      state: 'Approved',
      status: 'Passenger',
      description: 'This is the description for trip 2'
    }
  ];
}
