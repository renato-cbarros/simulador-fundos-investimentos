import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentRoute: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = location.pathname.split('/');

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url.split('/');
      }
    });
  }
}
