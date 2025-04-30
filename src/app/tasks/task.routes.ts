import { Routes } from '@angular/router';
import { TaskLayoutComponent } from './layouts/task-layout/task-layout.component';
import { TaskBoardPageComponent } from './pages/task-board-page/task-board-page.component';
import { TaskDetailPageComponent } from './pages/task-detail-page/task-detail-page.component';

export const taskRoutes: Routes = [
  {
    path: '',
    component: TaskLayoutComponent,
    children: [
      {
        path: '',
        component: TaskBoardPageComponent,
      },
      {
        path: ':id',
        component: TaskDetailPageComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];

export default taskRoutes;
