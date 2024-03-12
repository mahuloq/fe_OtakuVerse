import { Component } from '@angular/core';
import { AuthenticationService } from '../auth/services/authentication.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(public authService: AuthenticationService) {}

  isDropdownOpen = false;

  toggleDropdown(open: boolean): void {
    this.isDropdownOpen = open;
  }

  logout() {
    this.authService.logout();
  }
}
