import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'task-board',
    canActivate: [authGuard],
    loadChildren: () => import('./tasks/task.routes').then((m) => m.taskRoutes),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
