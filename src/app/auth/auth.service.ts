import { Injectable } from '@angular/core';

const AUTH_STORAGE_KEY = 'ngx_admin_auth_user';

export interface AuthUser {
  name: string;
  email: string;
  role: string;
  loginAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private memoryUser: AuthUser | null = null;

  login(name: string, email: string, password: string): boolean {
    if (!name || !email || !password) {
      return false;
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const isValidPassword = password.trim().length >= 4;

    if (normalizedName.length < 3 || !normalizedEmail || !isValidPassword) {
      return false;
    }

    const user: AuthUser = {
      name: normalizedName,
      email: normalizedEmail,
      role: 'Administrador',
      loginAt: new Date().toISOString(),
    };

    this.memoryUser = user;
    this.setStorageValue(user);
    return true;
  }

  logout(): void {
    this.memoryUser = null;
    this.removeStorageValue();
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  getCurrentUser(): AuthUser | null {
    if (this.memoryUser) {
      return this.memoryUser;
    }

    const storedUser = this.getStorageValue();
    if (storedUser) {
      this.memoryUser = storedUser;
      return storedUser;
    }

    return null;
  }

  private getStorageValue(): AuthUser | null {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  private setStorageValue(value: AuthUser): void {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(value));
    } catch {
      // ignore storage errors and keep session in memory only
    }
  }

  private removeStorageValue(): void {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
  }
}
