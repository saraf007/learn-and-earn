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
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];

  onLogout() {
    this.authService.logoutUser();
  }

}
