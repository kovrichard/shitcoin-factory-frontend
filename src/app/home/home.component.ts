import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShitcoinFactoryService } from '../shitcoin-factory.service';

interface Shitcoin {
  address: string;
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
  ticker = '';
  totalSupply = 0;

  constructor(private shitcoinFactory: ShitcoinFactoryService) {}

  async ngOnInit() {
    this.numberOfCoins = this.shitcoinFactory.numberOfCoinsObservable();

    this.numberOfCoins.subscribe(async (value: number) => {
      for (let i = 0; i < value; i++) {
        const address = await this.shitcoinFactory.getShitcoin(i);
        const name = await this.shitcoinFactory.getShitcoinName(address);
        const symbol = await this.shitcoinFactory.getShitcoinSymbol(address);
        const totalSupply = await this.shitcoinFactory.getShitcoinTotalSupply(
          address
        );
        this.coins.push({
          address: address,
          name: name,
          symbol: symbol,
          totalSupply: totalSupply / 10 ** 18,
        });
      }
    });
  }

  mint() {
    this.shitcoinFactory.create(this.name, this.ticker, this.totalSupply);
  }
}
