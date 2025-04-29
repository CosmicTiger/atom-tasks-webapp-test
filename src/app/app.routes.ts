import { Routes } from '@angular/router';

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
    loadComponent: () =>
      import('./tasks/pages/task-board-page/task-board-page.component').then(
        (m) => m.TaskBoardPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
