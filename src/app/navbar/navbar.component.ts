import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { Web3ModalService } from '../web3-modal/web3-modal.service';
import { provider } from 'web3-core';
import abi from '../web3-modal/factory-abi.json';
import { AbiItem } from 'web3-utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private web3: Web3;
  connected: boolean;
  account: string | null;
  factoryAbi: AbiItem[];
  contractAddress: string;

  constructor(private web3modalService: Web3ModalService) {
    this.account = '';
    this.factoryAbi = abi as AbiItem[];
    this.contractAddress = '0x791a7c3c9F35EBb7e981c7b8292d322f917b7A36';
  }

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
