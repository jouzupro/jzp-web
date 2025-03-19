import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardPageComponent } from '../pages/dashboard-page/dashboard-page.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { LessonPreviewComponent } from '../pages/lesson-preview/lesson-preview.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    title: 'Dashboard',
    component: DashboardPageComponent,
  },
  {
    path: 'play',
    canActivate: [AuthGuard],
    title: 'Play',
    component: LessonPreviewComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },
];
