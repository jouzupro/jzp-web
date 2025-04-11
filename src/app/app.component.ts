import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderAppComponent } from './components/header-app/header-app.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, HeaderAppComponent],
  template: `
    <header-app>
      <router-outlet></router-outlet>
    </header-app>
  `,
})
export class AppComponent {
  onSidebarToggled() {
    console.log('Sidebar toggled');
  }
}
