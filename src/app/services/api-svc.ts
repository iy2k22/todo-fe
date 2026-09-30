import { inject, Service } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../entities/todo';
import { UserSvc } from './user-svc';

@Service()
export class ApiSvc {
  baseUrl: string = 'http://localhost:5109/api';

  httpClient: HttpClient = inject(HttpClient);
  userSvc = inject(UserSvc);

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.userSvc.getToken()}`
    });
  }

  getTodos(userId: string) {
    return this.httpClient.get<Todo[]>(`${this.baseUrl}/GetTodos`, {
      headers: this.getHeaders(),
      params: {
        userId
      }
    });
  }

  getTodoById(id: number) {
    return this.httpClient.get<Todo>(`${this.baseUrl}/GetTodoById/${id}`, {
      headers: this.getHeaders()
    });
  }

  toggleStatus(id: number) {
    return this.httpClient.patch<boolean>(`${this.baseUrl}/ToggleStatus/${id}`, {}, {
      headers: this.getHeaders()
    });
  }

  deleteTodos() {
    return this.httpClient.delete<number>(`${this.baseUrl}/DeleteTodos`, {
      headers: this.getHeaders()
    });
  }

  createTodo(todo: Todo) {
    return this.httpClient.post<boolean>(`${this.baseUrl}/CreateTodo`, todo, {
      headers: this.getHeaders()
    });
  }

  deleteTodo(id: number) {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/DeleteTodoById/${id}`, {
      headers: this.getHeaders()
    });
  }
}
