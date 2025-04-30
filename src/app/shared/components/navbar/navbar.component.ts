import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import AuthUser from '@app/auth/interfaces/auth-user.interface';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = signal<AuthUser | null>(null);

  ngOnInit(): void {
    const user = this.authService.currentUser;

    if (user) {
      this.currentUser.set(user);
    }

    const savedTheme = localStorage.getItem('theme') || 'night';
    this.changeTheme(savedTheme);
  }

  changeTheme(theme: string) {
    const html = document.querySelector('html');
    if (html) {
      html.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
