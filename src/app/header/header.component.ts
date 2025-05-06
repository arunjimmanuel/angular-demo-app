import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../shared/constants';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../login/models/token.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: string | null = '';

  constructor(private router: Router) {
    const token = localStorage.getItem(AppConstants.TOKEN_KEY);
    try {
      if (token) {
        const token = localStorage.getItem(AppConstants.TOKEN_KEY);
        const decoded = token ? jwtDecode<TokenPayload>(token) : null;
        this.username = decoded?.sub || decoded?.email || 'User';
      }
    } catch (e) {
      console.error('Invalid token:', e);
    }
  }

  logout() {
    localStorage.removeItem(AppConstants.TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}
