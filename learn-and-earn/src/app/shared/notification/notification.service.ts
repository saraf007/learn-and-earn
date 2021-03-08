// Angular
import { Injectable } from '@angular/core';

// Project
import { NotificationComponent } from './notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  // showNotification(displayMessage: string) {
  //   this.snackBar.openFromComponent(NotificationComponent, {
  //     data: {
  //       message: displayMessage
  //     },
  //     duration: 5000,
  //     horizontalPosition: 'center',
  //     verticalPosition: 'bottom'
  //   });
  // }
}
