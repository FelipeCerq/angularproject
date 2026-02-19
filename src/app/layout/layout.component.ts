import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'ngx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  get userName(): string {
    return this.authService.getCurrentUser()?.name || 'Usuario';
  }

  get userRole(): string {
    return this.authService.getCurrentUser()?.role || 'Colaborador';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
