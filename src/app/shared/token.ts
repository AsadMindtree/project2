import { Injectable } from '@angular/core';

const TOKEN_KEY = 'Demo_app';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  set(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }
  get(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
  clear() {
    localStorage.removeItem(TOKEN_KEY);
  }
  isAuthenticated(): boolean {
    return !!this.get();
  }

  makeRandomToken(len = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz0123456789';
    let out = '';
    for (let i = 0; i < len; i++) {
      out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;
  }
}
