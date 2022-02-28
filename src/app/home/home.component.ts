import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShitcoinFactoryService } from '../shitcoin-factory.service';
import { Web3ModalService } from '../web3-modal/web3-modal.service';

interface Shitcoin {
  address: string;
  owner: string;
  name: string;
  symbol: string;
  totalSupply: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  numberOfCoins: Observable<number>;
  coins: Shitcoin[] = [];
  name = '';
  symbol = '';
  totalSupply: number;
  caller = '';

  constructor(
    private shitcoinFactory: ShitcoinFactoryService,
    private web3service: Web3ModalService
  ) {}

  async ngOnInit() {
    this.numberOfCoins = this.shitcoinFactory.numberOfCoins;
    this.web3service.account.subscribe((account: string) => {
      this.caller = account;
    });

    this.numberOfCoins.subscribe(async (value: number) => {
      for (let i = 0; i < value; i++) {
        const address = await this.shitcoinFactory.getShitcoin(i);
        const owner = await this.shitcoinFactory.getShitcoinOwner(address);
        const name = await this.shitcoinFactory.getShitcoinName(address);
        const symbol = await this.shitcoinFactory.getShitcoinSymbol(address);
        const totalSupply = await this.shitcoinFactory.getShitcoinTotalSupply(
          address
        );
        this.coins.push({
          address: address,
          owner: owner,
          name: name,
          symbol: symbol,
          totalSupply: totalSupply / 10 ** 18,
        });
      }
    });
  }

  mint() {
    this.shitcoinFactory.create(this.name, this.symbol, this.totalSupply);
  }
}
