import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import Task from '../interfaces/task.interface';
import { HttpResponseWithData } from '@app/core/interface/http-responses.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = `${environment.baseUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<HttpResponseWithData<Task[]> & { nextPage: boolean }>(
      this.tasksUrl
    );
  }
  getTaskById(id: string) {
    return this.http.get<HttpResponseWithData<Task>>(`${this.tasksUrl}/${id}`);
  }
  addTask(task: Task) {
    return this.http.post<HttpResponseWithData<Task>>(this.tasksUrl, task);
  }
  updateTask(id: string, task: Task) {
    if (task.id) {
      delete task.id;
    }

    return this.http.put<HttpResponseWithData<Task>>(
      `${this.tasksUrl}/${id}`,
      task
    );
  }
  toggleTask(id: string) {
    return this.http.patch<{ message: string }>(
      `${this.tasksUrl}/${id}/status-change`,
      null
    );
  }
  deleteTask(id: string) {
    return this.http.delete<{ message: string }>(`${this.tasksUrl}/${id}`);
  }
}
