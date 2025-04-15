import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'header-app',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
    CommonModule
  ],
  templateUrl: './header-app.component.html',
  styleUrl: './header-app.component.css',
})
export class HeaderAppComponent {
  listMenu = [
    {
      label: 'Learn',
      url: 'play',
    },
    {
      label: 'Review',
      url: 'play',
    },
    {
      label: 'Profile',
      url: 'profile',
    },
    {
      label: 'Practice',
      url: 'materials',
    },
    {
      label: 'Support',
      url: 'faq',
    },
    {
      label: 'Logout',
      url: 'login',
    },
  ];

  constructor(private router: Router) {}

  goTo(url: string) {
    this.router.navigate([url]);
  }
}
