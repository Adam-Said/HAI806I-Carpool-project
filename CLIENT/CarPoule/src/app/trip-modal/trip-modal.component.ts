import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Location } from '@angular/common';

interface Passenger {
  passenger_id: string;
  // add any other properties that the passenger object has
}
@Component({
  selector: 'app-trip-modal',
  templateUrl: './trip-modal.component.html',
  styleUrls: ['./trip-modal.component.css']
})


export class TripModalComponent implements OnInit {



  carpool: any;
  pending: any;
  isDriver: boolean = false;
  isPending: boolean = false;
  hasBookedSeat: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private authGuard: AuthGuard,
    private location: Location
  ) { }  
  
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const carpoolId = params['id'];
      this.apiService.getCarpool(carpoolId)
        .pipe(
          catchError((error) => {
            this.router.navigate(['/']);
            return throwError("No carpool found");
          })
        )
        .subscribe(data => {
          this.carpool = data[0];
          console.log(this.carpool);

          if (this.carpool.driver === this.authGuard.getId()) {
            this.isDriver = true;
            this.apiService.getPending(carpoolId)
              .subscribe(data => {
                if (data == "No pending found") {
                  this.pending = [];
                }
                else {
                  this.pending = data[0];
                  this.isPending = true;
                }
              });
          }

        });
    });

    // Check if the user has already booked a seat
    console.log(this.carpool.passengers);
    this.hasBookedSeat = this.carpool.passengers.some((passenger: Passenger) => passenger.passenger_id === this.authGuard.getId());
  }

  acceptPassenger(passenger_id: string, carpool_id: string) {
    this.apiService.acceptPending(carpool_id, passenger_id)
      .subscribe(
        (data: any) => {
          console.log(data);
          // Remove the passenger from the pending list
          this.pending.passengers = this.pending.passengers.filter((passenger: any) => passenger.passenger_id !== passenger_id);
          // Add the passenger to the carpool list
          this.carpool.passengers.push({ passenger_id: passenger_id });
          location.reload();
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  rejectPassenger(passenger_id: string, carpool_id: string) {
    this.apiService.rejectPending(carpool_id, passenger_id)
      .subscribe(
        (data: any) => {
          console.log(data);
          // Remove the passenger from the pending list
          this.pending.passengers = this.pending.passengers.filter((passenger: any) => passenger.passenger_id !== passenger_id);
          location.reload();
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  bookSeat(carpool_id: string) {
    this.apiService.bookSeat(carpool_id)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.router.navigate(['/trips']);
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

}
