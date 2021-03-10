// Angular
import { Component, Inject, OnInit } from '@angular/core';

// Project
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  message: string;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  displayMessage() {
    this.message = this.notificationService.displayMessage();
  }
}
