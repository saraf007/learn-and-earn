// Angular
import { Injectable } from '@angular/core';

// Project
import { NotificationComponent } from './notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  message: string

  constructor() { }

  showNotification(data: any) {
    if(data === false) {
     this.message = "Your answer is invalid.";
    }
  }

  displayMessage() {
    return this.message;
  }
}
