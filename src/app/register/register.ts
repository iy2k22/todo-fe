import { Component, inject, signal } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthSvc } from '../services/auth-svc';
import { Router, RouterLink } from '@angular/router';
import { ThemeBtn } from '../theme-btn/theme-btn';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, ThemeBtn],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  fb = inject(FormBuilder);
  authSvc = inject(AuthSvc);
  router = inject(Router);
  error = signal<boolean>(false);

  theForm: FormGroup = this.fb.group({
    email: [''],
    password: [''],
    firstName: [''],
    lastName: ['']
  });

  submit(e: Event) {
    e.preventDefault();
    this.error.set(false);
    this.authSvc.register(this.theForm.value).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => {
        console.error(err);
        this.error.set(true);
      }
    })
  }
}
