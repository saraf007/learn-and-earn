// Angular
import { Component, OnInit } from '@angular/core';

// Project
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  userEmail: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem("email");
  }

  onLogout() {
    this.authService.logoutUser();
  }
}
