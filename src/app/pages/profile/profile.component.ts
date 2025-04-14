import { Component } from '@angular/core';
import { CustomTypographyComponent } from '../../components/custom-typography/custom-typography.component';
import { CommonModule } from '@angular/common';
import { ClassNameToTextPipe } from "../../pipes/classname-to-text/class-name-to-text.pipe";
import { ExpansionPanelComponent } from "../../components/expansion-panel/expansion-panel.component";

@Component({
  selector: 'app-profile',
  imports: [CustomTypographyComponent, CommonModule, ClassNameToTextPipe, ExpansionPanelComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileData = {
    level: 3,
    totalExp: 3234,
    daysStudied: 54,
    longestStreak: 100,
    totalLearned: 30,
    totalReviewed: 40,
    totalAccuracy: 54
  };
  historyList = [
    {
      date: 'Today',
      reviews: [{ date: '9pm', total: 24 }],
      learned: [
        { date: '8pm', total: 3 },
        { date: '10pm', total: 5 },
      ],
    },
    {
      date: 'Yesterday',
      reviews: [],
      learned: [
        { date: '8pm', total: 3 },
        { date: '10pm', total: 5 },
      ],
    },
  ];

}
