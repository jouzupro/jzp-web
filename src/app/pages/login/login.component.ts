  import { Component } from '@angular/core';
import { CustomButtonComponent } from "../../components/button/button.component";

  @Component({
    selector: 'app-login',
    imports: [CustomButtonComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
  })
  export class LoginComponent {
    constructor() {
      console.log('called');
    }
  }
