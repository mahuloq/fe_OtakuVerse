import { Component, NgModule } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  user = {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  };
  errorMessage: string | null = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.user.password === this.user.password_confirmation) {
      console.log(this.user);
      this.authService.signUp(this.user).subscribe({
        next: (res: any) => {
          console.log('Sign up successful', res);
          // Redirect to login or another page
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          console.error('Sign up failed', error);
          // Handle error (e.g., show error message)
          if (error && error.error && error.error.errors) {
            this.errorMessage = error.error.errors.join(', ');
          } else {
            this.errorMessage = 'An error occurred while signing up.';
          }
        },
      });
    } else {
      console.error('Passwords do not match');
      // Handle password mismatch (e.g., show error message)
      this.errorMessage = 'Passwords do not match.';
    }
  }
}
