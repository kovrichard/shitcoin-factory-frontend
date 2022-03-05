import { Component, OnInit, Input } from '@angular/core';
import { ShitcoinFactoryService } from '../shitcoin-factory.service';
import { MatDrawer } from '@angular/material/sidenav';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() about: HTMLDivElement;

  constructor(private shitcoinFactory: ShitcoinFactoryService) {}

  ngOnInit() {}

  scroll($element: HTMLDivElement) {
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest'});
  }
}
