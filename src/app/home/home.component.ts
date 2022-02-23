import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShitcoinFactoryService } from '../shitcoin-factory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  numberOfCoins: Observable<number>;
  coins: string[] = [];
  name = '';
  ticker = '';
  totalSupply = 0;

  constructor(private shitcoinFactory: ShitcoinFactoryService) {}

  async ngOnInit() {
    this.numberOfCoins = this.shitcoinFactory.numberOfCoinsObservable();

    this.numberOfCoins.subscribe(async (value: number) => {
      for (let i = 0; i < value; i++) {
        const address = await this.shitcoinFactory.getShitcoin(i);
        this.coins.push(await this.shitcoinFactory.getShitcoinName(address));
      }
    });
  }

  mint() {
    this.shitcoinFactory.create(this.name, this.ticker, this.totalSupply);
  }
}
