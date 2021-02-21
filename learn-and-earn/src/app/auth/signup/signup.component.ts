// Angular
import { NgForm } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";

// Project
import { AuthService } from "../auth.service";
import { SnackBarService } from "src/app/shared/snack-bar.service";
import { Subscription } from "rxjs";

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  createUser: Subscription;

  isLoading:boolean = false;

    constructor(public authService: AuthService, public snackBarService: SnackBarService)
    { }

    ngOnInit() { }

    // Create User on Signup
    onSignup(form: NgForm) {
      if (form.invalid) {
        return;
      }
      this.createUser = this.authService.createUser(form.value.email, form.value.password)
      .subscribe((res) => {
        if(res.isCreated) {
          this.snackBarService.openSnackBar(res.message);
        }
        else {
          this.snackBarService.openSnackBar(res.message);
        }
      });
    }

    // to prevent memory leak
    ngOnDestroy() {
      this.createUser.unsubscribe();
    }
}
