import { Service } from '@angular/core';
import { TokenDTO } from '../dtos/token-dto';

@Service()
export class UserSvc {
  setToken(details: TokenDTO) {
    localStorage.setItem("token-details", JSON.stringify(details));
  }

  logout() {
    localStorage.removeItem("token-details");
  }

  getToken() {
    const res = localStorage.getItem("token-details");
    if (!res)
      return null;
    else {
      const obj: TokenDTO = JSON.parse(res);
      return new Date() > obj.expiration ? null : obj.token;
    }
  }

  getUserId() {
    const res = localStorage.getItem("token-details");
    if (!res)
      return "";
    else {
      const obj: TokenDTO = JSON.parse(res);
      return new Date() > obj.expiration ? "" : obj.userId;
    }
  }
}
