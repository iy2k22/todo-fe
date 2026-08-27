import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiSvc } from './services/api-svc';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Todo } from './entities/todo';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('todo-fe');

  apiSvc = inject(ApiSvc);
  fb = inject(FormBuilder);

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
    this.todos.set([]);
    const todos = await firstValueFrom(this.apiSvc.getTodos());
    this.todos.set(todos);
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
      updated: date
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

    if (result)
      await this.getTodos();
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
}
