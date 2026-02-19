import { Component } from '@angular/core';
import { AuthService, AuthUser } from '../auth/auth.service';

@Component({
  selector: 'ngx-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  user: AuthUser | null;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }
}
