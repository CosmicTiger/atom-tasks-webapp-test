import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  private tasksUrl = `${environment.baseUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(this.tasksUrl);
  }
  getTaskById(id: number) {
    return this.http.get(`${this.tasksUrl}/${id}`);
  }
  addTask(task: any) {
    return this.http.post(this.tasksUrl, task);
  }
  updateTask(task: any) {
    return this.http.put(`${this.tasksUrl}/${task.id}`, task);
  }
  deleteTask(id: number) {
    return this.http.delete(`${this.tasksUrl}/${id}`);
  }
}
