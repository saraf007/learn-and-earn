// Angular
import { Router, NavigationStart } from '@angular/router';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

// RXJS
import { Subscription } from 'rxjs';

// Project
import { Notification, NotificationType } from "./notification.model";
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit , OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  notifications: Notification[] = [];
  notificationSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private notificationService: NotificationService, private router: Router) { }

  ngOnInit() {
    this.notificationSubscription = this.notificationService.onNotification(this.id)
        .subscribe(notification => {

          if(!notification.message) {
            this.notifications = [];
            return;
          }

          this.notifications.push(notification);

          // auto close alert if required
          if (notification.autoClose) {
            setTimeout(() => this.removeNotification(notification), 1000);
        }
        })

         // clear alerts on location change
         this.routeSubscription = this.router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              this.notificationService.clear(this.id);
          }
      });
  }

  private removeNotification(notification: Notification) {
    // check if already removed to prevent error on auto close
    if (!this.notifications.includes(notification)) return;

    if (this.fade) {
        // fade out alert
        this.notifications.find(x => x === notification).fade = true;

        // remove alert after faded out
        setTimeout(() => {
            this.notifications = this.notifications.filter(x => x !== notification);
        }, 250);
    } else {
        // remove alert
        this.notifications = this.notifications.filter(x => x !== notification);
    }
}

ngOnDestroy() {
  // unsubscribe to avoid memory leaks
  this.notificationSubscription.unsubscribe();
  this.routeSubscription.unsubscribe();
}

cssClass(notification: Notification) {
  if (!notification) return;

  const classes = ['alert', 'alert-dismissable'];

  const notificationTypeClass = {
      [NotificationType.Success]: 'alert-success',
      [NotificationType.Error]: 'alert-danger',
      [NotificationType.Info]: 'alert-info',
      [NotificationType.Warning]: 'alert-warning'
  }

  classes.push(notificationTypeClass[notification.type]);

  if (notification.fade) {
      classes.push('fade');
  }

  return classes.join(' ');
}

}
