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
  successMessage = '';
  mode: 'login' | 'register' = 'login';

  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  signUpForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  setMode(mode: 'login' | 'register'): void {
    this.mode = mode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onLoginSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const email = this.signInForm.value.email || '';
    const password = this.signInForm.value.password || '';

    if (!this.authService.login(email, password)) {
      this.errorMessage = 'Email ou senha invalidos.';
      return;
    }

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
    const isSafeReturn = returnUrl.startsWith('/')
      && !returnUrl.startsWith('/login')
      && !returnUrl.startsWith('/logout');
    const safeReturnUrl = isSafeReturn ? returnUrl : '/dashboard';
    this.router.navigateByUrl(safeReturnUrl);
  }

  onRegisterSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const name = this.signUpForm.value.name || '';
    const email = this.signUpForm.value.email || '';
    const password = this.signUpForm.value.password || '';
    const confirmPassword = this.signUpForm.value.confirmPassword || '';

    if (password !== confirmPassword) {
      this.errorMessage = 'As senhas nao conferem.';
      return;
    }

    const result = this.authService.register(name, email, password);
    if (!result.success) {
      this.errorMessage = result.message;
      return;
    }

    this.successMessage = result.message;
    this.signUpForm.reset();
    this.mode = 'login';
    this.signInForm.patchValue({ email });
  }
}
