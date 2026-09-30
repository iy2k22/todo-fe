import { Routes } from '@angular/router';
import { Todos } from './todos/todos';
import { Login } from './login/login';
import { loginGuardGuard } from './guards/login-guard-guard';
import { Register } from './register/register';

export const routes: Routes = [
  {
    path: '',
    component: Todos,
    canActivate: [loginGuardGuard]
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  }
];
