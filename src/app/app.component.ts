import { Component } from '@angular/core';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [SidenavComponent, RouterModule],
  template: `<app-sidenav>
    <router-outlet></router-outlet>
</app-sidenav>`,
})
export class AppComponent {
  onSidebarToggled() {
    console.log('Sidebar toggled');
  }
}
