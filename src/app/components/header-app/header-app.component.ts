import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'header-app',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
  ],
  templateUrl: './header-app.component.html',
  styleUrl: './header-app.component.css',
})
export class HeaderAppComponent {
  constructor(private router: Router) {

  }


  onLearn() {
    this.router.navigate(['play'])
  }
  onDashboard() {
    this.router.navigate(['dashboard'])
  }
  onProfile() {
    this.router.navigate(['profile'])
  }
}
