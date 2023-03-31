import { Component } from '@angular/core';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  Options: any[] = [
    { icon: 'sentiment_very_dissatisfied', value: 0 },
    { icon: 'sentiment_very_satisfied', value: 1 }
  ];
}
