import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { Web3ModalService } from '../web3-modal/web3-modal.service';
import abi from '../web3-modal/factory-abi.json';
import { AbiItem } from 'web3-utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  connected: boolean;
  account: string | null = '';
  factoryAbi = abi as AbiItem[];
  contractAddress = '0x690d9f481E65Ab709Ba96DeFe20993A146a05f6c';

  constructor(private web3modalService: Web3ModalService) {}

  ngOnInit() {}

  log() {
    this.web3modalService.web3.eth
      .getAccounts()
      .then((accounts) => {
        this.account = accounts[0];
      })
      .catch((error) => {
        this.account = null;
      });
  }

  async mint() {
    console.log(this.factoryAbi);
    const factory = new this.web3modalService.web3.eth.Contract(
      this.factoryAbi,
      this.contractAddress
    );
    const numCoins = await factory.methods.numberOfCoins().call();
    console.log(numCoins);
    factory.methods
      .create('Manon Coin', 'MANON', 1)
      .send({ from: this.account });
    const coin = await factory.methods.getShitcoin(numCoins - 1).call();
    console.log(coin);
  }
}
