// Angular
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// Project
import { NotificationComponent } from './notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(displayMessage: string) {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        message: displayMessage
      },
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
