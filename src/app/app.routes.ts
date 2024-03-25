import { Routes } from '@angular/router';
import { noAuthGuard } from './features/auth/guards/no-auth.guard';
import { authGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/auth/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
    canActivate: [noAuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
    canActivate: [noAuthGuard],
  },
  {
    path: 'create-anime',
    loadComponent: () =>
      import('./features/create-anime/create-anime.component').then(
        (m) => m.CreateAnimeComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'anime/:id/:name',
    loadComponent: () =>
      import('./features/anime-detailed/anime-detailed.component').then(
        (m) => m.AnimeDetailedComponent
      ),
  },
  {
    path: 'anime/:id',
    loadComponent: () =>
      import('./features/anime-detailed/anime-detailed.component').then(
        (m) => m.AnimeDetailedComponent
      ),
  },
];
