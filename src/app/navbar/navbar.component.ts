import { Component, OnInit } from '@angular/core';
import { ShitcoinFactoryService } from '../shitcoin-factory.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private shitcoinFactory: ShitcoinFactoryService) {}

  ngOnInit() {}

  async mint() {
    this.shitcoinFactory.create('Manon Coin', 'MANON', 1);
  }
}
