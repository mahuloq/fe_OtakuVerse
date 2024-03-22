import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../features/auth/services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(public authService: AuthenticationService) {}
  dropdownStates: boolean[] = [false, false, false, false, false]; // Initialize all dropdowns as closed

  toggleDropdown(index: number, isOpen: boolean) {
    this.dropdownStates[index] = isOpen;
  }

  logout() {
    this.authService.logout();
  }
}
