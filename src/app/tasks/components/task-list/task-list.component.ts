import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent { }
