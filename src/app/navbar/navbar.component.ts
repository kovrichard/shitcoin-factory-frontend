import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
  @Input() shapeshifter: HTMLDivElement;

  @ViewChild('navbar') private navbar!: ElementRef<HTMLElement>;

  darkMode = false;

  constructor(private breakpoints: BreakpointObserver) {}

  ngOnInit() {
    this.breakpoints.observe(Breakpoints.Large).subscribe((result: any) => {
      let menuItems = this.navbar.nativeElement.querySelectorAll('.nav-item');

      if (result.matches) {
        this.navbar.nativeElement.classList.add('large');
        menuItems.forEach((element: any) => {
          element.classList.add('large');
        });
      }
      else {
        this.navbar.nativeElement.classList.remove('large');
        menuItems.forEach((element: any) => {
          element.classList.remove('large');
        });
      }
    });
  }

  scroll($element: HTMLDivElement) {
    $element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  highlight($event: Event) {
    const targetButton = ($event.target as HTMLElement).closest('button'); 

    var activeMenus = this.navbar.nativeElement.querySelectorAll('.active');
    activeMenus.forEach((element: any) => {
      element.classList.remove('active');
    });

    targetButton?.classList.add('active');
  }

  changeTheme() {
    this.darkMode = !this.darkMode;
  }
}
