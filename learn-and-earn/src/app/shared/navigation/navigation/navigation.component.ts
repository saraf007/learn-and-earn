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
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logoutUser();
  }

}
