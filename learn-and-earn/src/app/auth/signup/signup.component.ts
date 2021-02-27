// Angular
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";

// RXJS
import { Subscription } from "rxjs";

// Project
import { AuthService } from "../auth.service";
import { NotificationService } from "../../shared/notification/notification.service";

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  createUser: Subscription;
  isLoading:boolean = false;

    constructor(public authService: AuthService,
                public notificationService: NotificationService,
                private router: Router) { }

    ngOnInit() { }

    // Create User on Signup
    onSignup(form: NgForm) {
      if (form.invalid) {
        return;
      }
      this.createUser = this.authService.createUser(form.value.email, form.value.password)
      .subscribe((response) => {
          this.notificationService.showNotification(response.message);
          this.router.navigate(['/login']);
      });
    }

    // to prevent memory leak
    ngOnDestroy() {
      this.createUser.unsubscribe();
    }
}
