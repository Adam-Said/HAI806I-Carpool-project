import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {
  value: any;

  Options: any[] = [
    { icon: 'sentiment_very_dissatisfied', value: 1 },
    { icon: 'sentiment_dissatisfied', value: 2 },
    { icon: 'sentiment_very_satisfied', value: 3 }
  ];
}
