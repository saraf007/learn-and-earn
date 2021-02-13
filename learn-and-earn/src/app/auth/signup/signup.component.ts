import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading:boolean = false;

    constructor() { }

    ngOnInit() { }

    onSignup(form: NgForm) {
      console.log(form.value);
    }
}
