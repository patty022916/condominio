import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Usuario } from 'src/app/models/Usuarios';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  user: Usuario = new Usuario();

  constructor(
    private router: Router
  ) { }
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user') as string);
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('is_logged');
    this.router.navigate(['login']);
  }
}