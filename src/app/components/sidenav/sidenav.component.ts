import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Inject,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { Location } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { APP_TITLE } from '../../constant/texts';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  // variables
  @Output() toggled = new EventEmitter<void>();
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isMobile = true; // Initially set to false
  APP_TITLE = APP_TITLE;
  routes: any[] = [];
  currentTitle: string = '';
  showBack: boolean = false;
  private snackBar = inject(MatSnackBar);

  // constructor
  constructor(
    private router: Router,
    private location: Location,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  @HostListener('window:resize', ['$event'])
  onResize(_: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  // logics
  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile && this.sidenav) {
        this.sidenav.open();
      } else if (this.isMobile && this.sidenav) {
        this.sidenav.close();
      }
    }
  }

  toggleSidenav() {
    this.sidenav.toggle();
    this.toggled.emit();
  }
  toggleDrawer(route: any) {
    route.open = !route.open;
  }

  navigateBack() {
    this.location.back();
    // Clear query parameters after navigating back
    this.location.replaceState(this.router.url.split('?')[0]);
  }
}
