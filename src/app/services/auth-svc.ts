import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { RegisterDTO } from '../dtos/register-dto';
import { LoginDTO } from '../dtos/login-dto';
import { TokenDTO } from '../dtos/token-dto';

@Service()
export class AuthSvc {
  http = inject(HttpClient);
  baseUrl: string = 'http://localhost:5109/api/Auth';

  register(details: RegisterDTO) {
    return this.http.post(`${this.baseUrl}/register`, details);
  }

  login(details: LoginDTO) {
    return this.http.post<TokenDTO>(`${this.baseUrl}/login`, details);
  }
}
