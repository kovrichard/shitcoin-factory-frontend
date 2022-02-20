import { Component, OnInit } from '@angular/core';
import { Web3ModalService } from '../web3-modal/web3-modal.service';
import abi from '../web3-modal/factory-abi.json';
import { AbiItem } from 'web3-utils';
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
