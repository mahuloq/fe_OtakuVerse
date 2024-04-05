import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  errorMessage: string[] | null = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        console.log('Logged in with token:', res.token);
        console.log(res.user);
        this.authService.setToken(res.token, res.user);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Login error', error);

        // Handle error (e.g., show error message)
        if (error && error.error && error.error.error) {
          this.errorMessage = error.error.error;
        } else {
          this.errorMessage = ['An error occurred while logging in.'];
        }
      },
    });
  }
}
