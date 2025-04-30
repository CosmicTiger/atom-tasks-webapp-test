import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@app/auth/services/auth.service';
import { TaskCardComponent } from '@app/tasks/components/task-card/task-card.component';
import Task from '@app/tasks/interfaces/task.interface';
import { TaskService } from '@app/tasks/services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-board-page',
  imports: [CommonModule, TaskCardComponent, ReactiveFormsModule],
  templateUrl: './task-board-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBoardPageComponent implements OnInit, AfterViewInit {
  @ViewChild('editTitleInput') editTitleInput!: ElementRef<HTMLInputElement>;
  @ViewChild('deleteConfirmButton')
  deleteConfirmButton!: ElementRef<HTMLButtonElement>;
  private taskService = inject(TaskService);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);

  tasks = signal<Task[]>([]);
  isThereNextPage = false;
  isTherePreviousPage = false;
  selectedTask: Task | null = null;
  showEditModal = false;
  showDeleteModal = false;

  addForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.maxLength(200)]],
  });

  editForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
  });

  ngOnInit() {
    this.getTasks();
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

  getTasks(): void {
    this.taskService.getTasks().subscribe((response) => {
      this.tasks.set(response.data);
    });
  }

  onToggle(task: Task) {
    if (!task.id) {
      return;
    }

    this.taskService.toggleTask(task.id).subscribe(() => {
      this.getTasks();
    });
  }

  onEdit(task: Task) {
    this.selectedTask = task;
    this.showEditModal = true;

    setTimeout(() => {
      this.editTitleInput?.nativeElement.focus();
    }, 50);
  }

  addTask() {
    if (this.addForm.invalid) return;

    const newTask = {
      ...this.addForm.value,
      ...(!this.addForm.value.description && { description: '' }),
      createdBy: this.authService.currentUser?.id,
    };

    this.taskService.addTask(newTask).subscribe({
      next: () => {
        this.getTasks();
        this.toastr.success('Tarea añadida correctamente ✅');
        this.addForm.reset();
      },
      error: () => this.toastr.error('Error al añadir la tarea ❌'),
    });
  }

  confirmEdit() {
    if (!this.selectedTask || !this.selectedTask.id || this.editForm.invalid)
      return;

    this.selectedTask.createdAt && delete this.selectedTask.createdAt;
    this.selectedTask.updatedAt && delete this.selectedTask.updatedAt;
    const updated = {
      ...this.selectedTask,
      ...this.editForm.value,
      updatedBy: this.authService.currentUser?.id,
    };

    this.taskService.updateTask(this.selectedTask.id, updated).subscribe({
      next: () => {
        this.getTasks();
        this.toastr.success('Tarea editada correctamente ✅');
        this.closeEditModal();
      },
      error: () => this.toastr.error('Error al editar la tarea ❌'),
    });
  }

  onDelete(task: Task) {
    this.selectedTask = task;
    this.showDeleteModal = true;

    setTimeout(() => {
      this.deleteConfirmButton?.nativeElement.focus();
    }, 50);
  }

  confirmDelete() {
    if (!this.selectedTask || !this.selectedTask.id) return;

    this.taskService.deleteTask(this.selectedTask.id).subscribe({
      next: () => {
        this.getTasks();
        this.toastr.success('Tarea eliminada correctamente ✅');
        this.closeDeleteModal();
      },
      error: () => this.toastr.error('Error al eliminar la tarea ❌'),
    });
  }

  closeDeleteModal() {
    this.selectedTask = null;
    this.showDeleteModal = false;
  }

  closeEditModal() {
    this.selectedTask = null;
    this.showEditModal = false;
    this.editForm.reset();
  }
}
