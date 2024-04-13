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
    path: 'top-anime',
    loadComponent: () =>
      import('./features/top-anime/top-anime.component').then(
        (m) => m.TopAnimeComponent
      ),
  },
  {
    path: 'profile/:username',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },

  {
    path: 'anime/:id',
    loadComponent: () =>
      import('./features/anime-detailed/anime-detailed.component').then(
        (m) => m.AnimeDetailedComponent
      ),
  },
  {
    path: 'anime/:id/edit-anime',
    loadComponent: () =>
      import('./features/edit-anime/edit-anime.component').then(
        (m) => m.EditAnimeComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'anime/:id/cast-creation',
    loadComponent: () =>
      import('./features/cast-creation/cast-creation.component').then(
        (m) => m.CastCreationComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'anime/:id/create-review',
    loadComponent: () =>
      import('./features/create-review/create-review.component').then(
        (m) => m.CreateReviewComponent
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
];
