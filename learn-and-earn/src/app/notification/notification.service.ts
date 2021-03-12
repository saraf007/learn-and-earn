// Angular
import { Injectable } from '@angular/core';

// RXJS
import { filter } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

// Project
import { Notification, NotificationType } from "./notification.model";
import { NotificationComponent } from './notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private subject = new Subject<Notification>();
  private defaultId = 'default-alert';

   // enable subscribing to Notification observable
    onNotification(id = this.defaultId): Observable<Notification> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string, options?: any) {
        this.alert(new Notification({ ...options, type: NotificationType.Success, message }));
    }

    error(message: string, options?: any) {
        this.alert(new Notification({ ...options, type: NotificationType.Error, message }));
    }

    info(message: string, options?: any) {
        this.alert(new Notification({ ...options, type: NotificationType.Info, message }));
    }

    warn(message: string, options?: any) {
        this.alert(new Notification({ ...options, type: NotificationType.Warning, message }));
    }

    // main alert method
    alert(alert: Notification) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Notification({ id }));
    }
}
