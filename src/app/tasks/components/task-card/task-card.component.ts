import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import Task from '@app/tasks/interfaces/task.interface';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule, RouterLink, SlicePipe, DatePipe],
  templateUrl: './task-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent {
  task = input.required<Task>();

  @Output() toggle = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  onToggleTask() {
    this.toggle.emit(this.task());
  }

  onEditTask() {
    this.edit.emit(this.task());
  }

  onDeleteTask() {
    this.delete.emit(this.task());
  }
}
