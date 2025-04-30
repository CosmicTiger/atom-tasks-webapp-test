import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '@app/tasks/services/task.service';
import { signal } from '@angular/core';
import Task from '@app/tasks/interfaces/task.interface';
import { ToastrService } from 'ngx-toastr';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-task-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './task-detail-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailPageComponent implements OnInit, AfterViewInit {
  @ViewChild('editTitleInput') editTitleInput!: ElementRef<HTMLInputElement>;
  @ViewChild('deleteConfirmButton')
  deleteConfirmButton!: ElementRef<HTMLButtonElement>;
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);

  id = this.route.snapshot.paramMap.get('id');
  task = signal<Task | null>(null);
  selectedTaskToDelete: Task | null = null;
  showDeleteModal = false;
  showEditModal = false;

  editForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
  });

  ngOnInit() {
    this.getTask();
  }

  ngAfterViewInit() {
    document.addEventListener('keydown', this.handleEscapeKey);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleEscapeKey);
  }

  handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      if (this.showEditModal) {
        this.closeEditModal();
      }

      if (this.showDeleteModal) {
        this.closeDeleteModal();
      }
    }
  };

  getTask() {
    if (!this.id) return;

    this.taskService.getTaskById(this.id).subscribe({
      next: (response) => this.task.set(response.data),
      error: () => this.router.navigateByUrl('/task-board'),
    });
  }

  onToggleTask(task: Task) {
    if (!task.id) {
      return;
    }

    this.taskService.toggleTask(task.id).subscribe(() => {
      this.getTask();
    });
  }

  onEditTask(task: Task) {
    this.editForm.setValue({
      title: task.title,
      description: task.description || '',
    });
    this.showEditModal = true;
    setTimeout(() => {
      this.editTitleInput?.nativeElement.focus();
    }, 50);
  }

  confirmEdit() {
    const taskToEdit = this.task();
    if (!taskToEdit || !taskToEdit.id || this.editForm.invalid) return;

    const updated = {
      ...taskToEdit,
      ...this.editForm.value,
    };

    this.taskService.updateTask(taskToEdit.id, updated).subscribe({
      next: () => {
        this.toastr.success('Tarea actualizada correctamente 📝');
        this.closeEditModal();
        this.getTask();
      },
      error: () => {
        this.toastr.error('Error al actualizar la tarea ❌');
      },
    });
  }

  onDeleteTask() {
    this.showDeleteModal = true;
    setTimeout(() => {
      this.deleteConfirmButton?.nativeElement.focus();
    }, 50);
  }

  confirmDelete() {
    const task = this.task();
    if (!task || !task.id) return;

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.getTask();
        this.toastr.success('Tarea eliminada correctamente ✅');
        this.closeDeleteModal();
        this.router.navigateByUrl('/task-board');
      },
      error: () => this.toastr.error('Error al eliminar la tarea ❌'),
    });
  }

  closeDeleteModal() {
    this.selectedTaskToDelete = null;
    this.showDeleteModal = false;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editForm.reset();
  }
}
