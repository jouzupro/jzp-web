import { Component, HostListener, ElementRef } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-practice-setting',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ButtonComponent,
    MatIconModule
],
  templateUrl: './practice-setting.component.html',
  styleUrl: './practice-setting.component.css',
})
export class PracticeSettingComponent {
  isOpen = false;

  constructor(private eRef: ElementRef, private router: Router) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  startPractite() {
    this.router.navigate(['play']);
  }
}
