import { Component, OnInit, signal, inject, DOCUMENT } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ApiSvc } from '../services/api-svc';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Todo } from '../entities/todo';
import { firstValueFrom } from 'rxjs';
import { AuthSvc } from '../services/auth-svc';
import { UserSvc } from '../services/user-svc';
import { ThemeBtn } from '../theme-btn/theme-btn';
import { ThemeSvc } from '../services/theme-svc';

@Component({
  selector: 'app-todos',
  imports: [ReactiveFormsModule, ThemeBtn],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos {
  apiSvc = inject(ApiSvc);
  fb = inject(FormBuilder);
  document = inject(DOCUMENT);
  authSvc = inject(AuthSvc);
  userSvc = inject(UserSvc);
  router = inject(Router);
  themeSvc = inject(ThemeSvc);

  newTodo = new FormControl<string>("");
  todos = signal<Todo[]>([]);

  filters: [string, (x: Todo) => boolean][] = [
    ['All', (x) => x.completed !== null],
    ['Active', (x) => !x.completed],
    ['Completed', (x) => x.completed]
  ];

  currFilter = 0;

  theForm = this.fb.nonNullable.group({
    newTodo: [""]
  });

  async ngOnInit() {

    await this.getTodos();
  }

  async getTodos() {
    const userId = this.userSvc.getUserId();

    if (!userId)
      this.router.navigate(['/login']);
    else {
      this.todos.set([]);
      const todos = await firstValueFrom(this.apiSvc.getTodos(userId));
      this.todos.set(todos);
    }
  }

  async deleteTodo(idx: number) {
    const result = await firstValueFrom(this.apiSvc.deleteTodo(this.todos()[idx].id));

    if (result)
      await this.getTodos();
  }

  async createTodo(name: string) {
    const date = new Date();

    const toAdd: Todo = {
      id: 0,
      name,
      completed: false,
      created: date,
      updated: date,
      userId: this.userSvc.getUserId()
    }

    const result = await firstValueFrom(this.apiSvc.createTodo(toAdd));
    return result;
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    let result = false;

    const { newTodo } = this.theForm.value;

    if (newTodo)
      result = await this.createTodo(newTodo)

    if (result) {
      this.theForm.reset();
      await this.getTodos();
    }
  }

  async toggleStatus(idx: number) {
    const result = await firstValueFrom(this.apiSvc.toggleStatus(this.todos()[idx].id));

    if (result)
      await this.getTodos();
  }

  toggleFilter(i: number) {
    this.currFilter = i;
  }

  async clearCompleted() {
    const result = await firstValueFrom(this.apiSvc.deleteTodos());
    if (result !== 0)
      await this.getTodos();
  }

  logout() {
    this.userSvc.logout();
    this.router.navigate(['/login']);
  }
}
