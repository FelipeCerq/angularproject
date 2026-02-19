import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  errorMessage = '';

  loginForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  onSubmit(): void {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const name = this.loginForm.value.name || '';
    const email = this.loginForm.value.email || '';
    const password = this.loginForm.value.password || '';

    if (!this.authService.login(name, email, password)) {
      this.errorMessage = 'Credenciais invalidas.';
      return;
    }

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
    const isSafeReturn = returnUrl.startsWith('/')
      && !returnUrl.startsWith('/login')
      && !returnUrl.startsWith('/logout');
    const safeReturnUrl = isSafeReturn ? returnUrl : '/dashboard';
    this.router.navigateByUrl(safeReturnUrl);
  }
}
