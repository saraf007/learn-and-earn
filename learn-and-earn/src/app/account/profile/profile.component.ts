// Angular
import { Component, OnInit } from '@angular/core';

// Project
import { ProfileService } from "./profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedinUserEmail: string;
  email: string;
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.onGetUserProfile();
  }

  onGetUserProfile() {
    this.loggedinUserEmail = localStorage.getItem("email");
    this.profileService.getUserProfile(this.loggedinUserEmail).subscribe(data => {
      console.log(data);
      this.email = data.user;
    })
  }
}
