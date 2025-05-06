import { Router, NavigationEnd, Event as RouterEvent, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, NgIf],
  templateUrl: './app.component.html'
})
export class AppComponent {
  showHeader: boolean = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.showHeader = !event.urlAfterRedirects.includes('/login');
    });
  }
}
