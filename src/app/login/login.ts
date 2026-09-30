import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthSvc } from '../services/auth-svc';
import { UserSvc } from '../services/user-svc';
import { ThemeBtn } from '../theme-btn/theme-btn';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ThemeBtn, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  fb = inject(FormBuilder);
  router = inject(Router);
  authSvc = inject(AuthSvc);
  userSvc = inject(UserSvc);
  error = signal<boolean>(false);

  theForm: FormGroup = this.fb.group({
    email: [''],
    password: ['']
  });

  login(e: Event) {
    e.preventDefault();
    this.error.set(false);
    this.authSvc.login(this.theForm.value).subscribe({
      next: x => {
        this.userSvc.setToken(x);
        this.router.navigate(['/']);
      },
      error: err => {
        this.error.set(true);
        console.error(err);
      }
    })
  }
}
