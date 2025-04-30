import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@app/auth/services/auth.service';
import AuthUser from '@app/auth/interfaces/auth-user.interface';
import { NavbarComponent } from '@app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  formBuilder = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);
  email: string = '';
  authService = inject(AuthService);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {}

  loginOnSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { email = '' } = this.loginForm.value;

    this.authService
      .loginOrCreate(email!)
      .subscribe((isAuthenticated: AuthUser) => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/task-board');
          return;
        }

        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        }, 2000);
      });
  }
}
