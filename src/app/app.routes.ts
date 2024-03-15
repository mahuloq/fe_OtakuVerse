import { Routes } from '@angular/router';
import { noAuthGuard } from './auth/guards/no-auth.guard';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/signup/signup.component').then((m) => m.SignupComponent),
    canActivate: [noAuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
    canActivate: [noAuthGuard],
  },
  {
    path: 'create-anime',
    loadComponent: () =>
      import('./create-anime/create-anime.component').then(
        (m) => m.CreateAnimeComponent
      ),
    canActivate: [authGuard],
  },
];
