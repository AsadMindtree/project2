import { Routes } from '@angular/router';
import { HomePage } from './page/home/home';
import { AboutPage } from './page/about/about';
import { Auth } from './page/auth/auth';
export const routes: Routes = [
  { path: '', component: HomePage, title: 'Home' },
  { path: 'about', component: AboutPage, title: 'About' },
  { path: 'auth', component: Auth, title: 'Auth' },
  { path: '**', redirectTo: '' },
];
