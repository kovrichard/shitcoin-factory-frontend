import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() home: HTMLDivElement;
  @Input() about: HTMLDivElement;
  @Input() factory: HTMLDivElement;
  @Input() myCoins: HTMLDivElement;

  darkMode = false;

  constructor() {}

  ngOnInit() {}

  scroll($element: HTMLDivElement) {
    $element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  changeTheme() {
    this.darkMode = !this.darkMode;
  }
}
