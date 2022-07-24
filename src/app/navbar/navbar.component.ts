import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

  constructor() {}

  ngOnInit() {}

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
}
