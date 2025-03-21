  import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { Router } from '@angular/router';

  @Component({
    selector: 'app-login',
    imports: [ButtonComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
  })
  export class LoginComponent {
    constructor(private router: Router) {
    }

    onPlay() {
      this.router.navigate(['dashboard']);
    }
  }
