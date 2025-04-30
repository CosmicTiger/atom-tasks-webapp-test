import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-task-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './task-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskLayoutComponent {}
