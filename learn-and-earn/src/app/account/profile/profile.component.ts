// Angular
import { NgForm } from "@angular/forms";
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
  filedata: any;
  imagePreview: string;

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

  onSaveProfile(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value.username);
    console.log(this.filedata);
  }

  onImageUpload(event: Event) {
    this.filedata = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.filedata);
  }
}
