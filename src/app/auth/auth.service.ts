import { Injectable } from '@angular/core';

const AUTH_SESSION_STORAGE_KEY = 'ngx_admin_auth_user';
const AUTH_USERS_STORAGE_KEY = 'ngx_admin_registered_users';

export interface AuthUser {
  name: string;
  email: string;
  role: string;
  loginAt: string;
}

interface StoredAuthUser {
  name: string;
  email: string;
  role: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private memoryUser: AuthUser | null = null;
  private memoryUsers: StoredAuthUser[] | null = null;

  login(email: string, password: string): boolean {
    if (!email || !password) {
      return false;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || normalizedPassword.length < 4) {
      return false;
    }

    const account = this.getUsers().find(user =>
      user.email === normalizedEmail && user.password === normalizedPassword);

    if (!account) {
      return false;
    }

    const user: AuthUser = {
      name: account.name,
      email: account.email,
      role: account.role,
      loginAt: new Date().toISOString(),
    };

    this.memoryUser = user;
    this.setSessionValue(user);
    return true;
  }

  register(name: string, email: string, password: string): { success: boolean; message: string } {
    const normalizedName = (name || '').trim();
    const normalizedEmail = (email || '').trim().toLowerCase();
    const normalizedPassword = (password || '').trim();

    if (normalizedName.length < 3) {
      return { success: false, message: 'Nome deve ter no minimo 3 caracteres.' };
    }

    if (!normalizedEmail) {
      return { success: false, message: 'Email invalido.' };
    }

    if (normalizedPassword.length < 4) {
      return { success: false, message: 'Senha deve ter no minimo 4 caracteres.' };
    }

    const users = this.getUsers();
    const alreadyExists = users.some(user => user.email === normalizedEmail);

    if (alreadyExists) {
      return { success: false, message: 'Ja existe cadastro para este email.' };
    }

    const newUser: StoredAuthUser = {
      name: normalizedName,
      email: normalizedEmail,
      role: 'Analista',
      password: normalizedPassword,
    };

    this.memoryUsers = [...users, newUser];
    this.setUsers(this.memoryUsers);

    return { success: true, message: 'Cadastro realizado. Agora faca login.' };
  }

  logout(): void {
    this.memoryUser = null;
    this.removeSessionValue();
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  getCurrentUser(): AuthUser | null {
    if (this.memoryUser) {
      return this.memoryUser;
    }

    const storedUser = this.getSessionValue();
    if (storedUser) {
      this.memoryUser = storedUser;
      return storedUser;
    }

    return null;
  }

  private getUsers(): StoredAuthUser[] {
    if (this.memoryUsers) {
      return this.memoryUsers;
    }

    try {
      const raw = localStorage.getItem(AUTH_USERS_STORAGE_KEY);
      if (!raw) {
        this.memoryUsers = [];
        return this.memoryUsers;
      }

      const parsed = JSON.parse(raw) as StoredAuthUser[];
      this.memoryUsers = Array.isArray(parsed) ? parsed : [];
      return this.memoryUsers;
    } catch {
      this.memoryUsers = [];
      return this.memoryUsers;
    }
  }

  private setUsers(users: StoredAuthUser[]): void {
    try {
      localStorage.setItem(AUTH_USERS_STORAGE_KEY, JSON.stringify(users));
    } catch {
      // ignore storage errors and keep data in memory only
    }
  }

  private getSessionValue(): AuthUser | null {
    try {
      const raw = localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  private setSessionValue(value: AuthUser): void {
    try {
      localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(value));
    } catch {
      // ignore storage errors and keep session in memory only
    }
  }

  private removeSessionValue(): void {
    try {
      localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
  }
}
