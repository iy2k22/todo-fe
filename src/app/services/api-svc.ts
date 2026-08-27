import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../entities/todo';

@Service()
export class ApiSvc {
  baseUrl: string = 'http://localhost:5109/api';

  httpClient: HttpClient = inject(HttpClient);

  getTodos() {
    return this.httpClient.get<Todo[]>(`${this.baseUrl}/GetTodos`);
  }

  getTodoById(id: number) {
    return this.httpClient.get<Todo>(`${this.baseUrl}/GetTodoById/${id}`);
  }

  toggleStatus(id: number) {
    return this.httpClient.patch<boolean>(`${this.baseUrl}/ToggleStatus/${id}`, {});
  }

  deleteTodos() {
    return this.httpClient.delete<number>(`${this.baseUrl}/DeleteTodos`);
  }

  createTodo(todo: Todo) {
    return this.httpClient.post<boolean>(`${this.baseUrl}/CreateTodo`, todo);
  }

  deleteTodo(id: number) {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/DeleteTodoById/${id}`);
  }
}
