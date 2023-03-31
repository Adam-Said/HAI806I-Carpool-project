import { Component } from '@angular/core';

@Component({
  selector: 'app-trip-modal',
  templateUrl: './trip-modal.component.html',
  styleUrls: ['./trip-modal.component.css']
})
export class TripModalComponent {

    title = 'Montpellier - Marseille';
    date = '2018-01-01';
    description = 'This is the description for trip 1';
    isDriver = true;
    passengers = [
      { username: 'user1', photo: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png', asking: true, accepted: true }, 
      { username: 'user2', photo: 'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png', asking: false,  accepted: false},
      { username: 'user3', photo: 'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png', asking: true,  accepted: true }
    ];
    
}
