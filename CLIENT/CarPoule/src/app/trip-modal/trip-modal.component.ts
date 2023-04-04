import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
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

          if (this.carpool.driver === this.authGuard.getId()) {
            this.isDriver = true;
            this.apiService.getPending(carpoolId)
              .subscribe(data2 => {
                if (data2[0] == null) {
                  this.pending = null;
                }
                else {
                  const passengersIDs: String[] = [];
                  data2[0].passengers.forEach((carpool: any) => {
                    passengersIDs.push(carpool.passenger_id);
                  });
                  this.getPassengersFromId(passengersIDs)
                    .subscribe((data: any[]) => {
                      this.pending = data;
                    });
                  this.isPending = true;
                }
              });
          }

          if (this.carpool.passengers == null) {
            this.carpool.passengers = [];
          }

          // Check if the user has already booked a seat
          if ("passengers" in this.carpool) {
            this.hasBookedSeat = this.carpool.passengers.some((passenger: Passenger) => passenger.passenger_id === this.authGuard.getId());
          }
        });
    });

  }

  acceptPassenger(passenger_id: string, carpool_id: string) {
    this.apiService.acceptPending(carpool_id, passenger_id)
      .subscribe(
        (data: any) => {
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
          this.router.navigate(['/trips']);
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  getPassengersFromId(passengers: String[]): Observable<any[]> {
    return this.apiService.getSimpleUser(passengers)
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError((error: any) => {
          console.error(error); // Log any errors
          return of([]); // Return an empty array if there is an error
        })
      );
  }


}
