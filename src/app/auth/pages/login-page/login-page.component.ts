import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@app/auth/services/auth.service';
import { HttpResponseWithData } from '@app/core/interface/http-responses.interface';
import AuthUser from '@app/auth/interfaces/auth-user.interface';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
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

    this.authService.loginOrCreate(email!).subscribe({
      next: (res: HttpResponseWithData<AuthUser>) => {
        this.authService.setUser(res.data as AuthUser);
        this.router.navigate(['/task-board']);
      },
      error: (err: Error) => {
        console.error('Login failed', err);
      },
    });
  }
}
