import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

interface NavLink {
  path: string;
  label: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatToolbarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  links: NavLink[] = [
    { path: '', label: 'Home', exact: true },
    { path: 'about', label: 'About' },
    { path: 'auth', label: 'Login / Sign Up' },
  ];
}
