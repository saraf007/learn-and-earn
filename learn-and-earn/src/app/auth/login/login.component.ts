// Angular
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// RXJS
import { Subscription } from "rxjs";

// Project
import { AuthService } from '../auth.service';
import { NotificationService } from 'src/app/notification/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    loginUser: Subscription;
    isLoading:boolean = false;

    constructor(public authService: AuthService,
       public notificationService: NotificationService,
       private router: Router) { }

    ngOnInit() { }

    // login user
    onLogin(form: NgForm) {
     if (form.invalid) {
       return;
     }
     localStorage.setItem("email", form.value.email);
     this.isLoading = true;
     this.loginUser = this.authService.loginUser(form.value.email, form.value.password)
      .subscribe((res) => {
        this.isLoading = false;
        this.router.navigate(['/navigation']);
      });
    }

    // signup user
    signup(){
      this.router.navigate(['/signup']);
    }
}
