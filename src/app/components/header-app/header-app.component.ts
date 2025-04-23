import { Component, OnInit } from '@angular/core';

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
    CommonModule,
  ],
  templateUrl: './header-app.component.html',
  styleUrl: './header-app.component.css',
})
export class HeaderAppComponent implements OnInit {
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

  showHeader = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.showHeader =
        this.router.url !== '/login' && this.router.url !== '/register';
    });
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }
}
