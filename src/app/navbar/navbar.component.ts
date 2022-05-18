import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
      const menuItems = this.navbar.nativeElement.querySelectorAll('.nav-item');

      if (result.matches) {
        this.navbar.nativeElement.classList.add('large');
        menuItems.forEach((element: any) => {
          element.classList.add('large');
        });
      } else {
        this.navbar.nativeElement.classList.remove('large');
        menuItems.forEach((element: any) => {
          element.classList.remove('large');
        });
      }
    });

    this.breakpoints
      .observe([Breakpoints.Medium, Breakpoints.Small])
      .subscribe((result: any) => {
        const menuItems =
          this.navbar.nativeElement.querySelectorAll('.nav-item');

        if (result.matches) {
          this.navbar.nativeElement.classList.add('small-medium');
          menuItems.forEach((element: any) => {
            element.classList.add('small-medium');
          });
        } else {
          this.navbar.nativeElement.classList.remove('small-medium');
          menuItems.forEach((element: any) => {
            element.classList.remove('small-medium');
          });
        }
      });

    this.breakpoints.observe(Breakpoints.Small).subscribe((result: any) => {
      const menuItems = this.navbar.nativeElement.querySelectorAll('.nav-item');

      if (result.matches) {
        menuItems.forEach((element: any) => {
          element.classList.add('small');
        });
      } else {
        menuItems.forEach((element: any) => {
          element.classList.remove('small');
        });
      }
    });

    this.breakpoints.observe(Breakpoints.XSmall).subscribe((result: any) => {
      const menuButton = document.getElementsByClassName('menu')[0];

      if (result.matches) {
        this.navbar.nativeElement.classList.remove('d-flex');
        this.navbar.nativeElement.classList.add('d-none');
        menuButton.classList.remove('d-none');
        menuButton.classList.add('d-flex');
      } else {
        this.navbar.nativeElement.classList.remove('d-none');
        this.navbar.nativeElement.classList.add('d-flex');
        menuButton.classList.remove('d-flex');
        menuButton.classList.add('d-none');
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

    const activeMenus = this.navbar.nativeElement.querySelectorAll('.active');
    activeMenus.forEach((element: any) => {
      element.classList.remove('active');
    });

    targetButton?.classList.add('active');
  }

  changeTheme() {
    this.darkMode = !this.darkMode;
  }
}
