import { Component, OnInit } from '@angular/core';
import { ShitcoinFactoryService } from '../shitcoin-factory.service';
import { takeWhile, timer } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChainService } from '../chain.service';

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
  private numberOfCoins = 0;
  numCoins = 0;
  coins: Shitcoin[] = [];
  recentCoins: Shitcoin[] = [];
  name = '';
  symbol = '';
  totalSupply: number;
  explorer = '';

  outerDiameter = 280;
  middleDiameter = 218;
  innerDiameter = 156;
  aboutDiameter = 218;

  constructor(
    private shitcoinFactory: ShitcoinFactoryService,
    private breakpoints: BreakpointObserver,
    private chain: ChainService
  ) {}

  async ngOnInit() {
    this.breakpoints
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result: any) => {
        if (result.matches) {
          this.outerDiameter = 230;
          this.middleDiameter = 168;
          this.innerDiameter = 106;
        } else {
          this.outerDiameter = 280;
          this.middleDiameter = 218;
          this.innerDiameter = 156;
        }
      });

    this.chain.explorer.subscribe((url: string) => {
      this.explorer = url;
      this.fetchCoins();
    });
  }

  private fetchCoins() {
    this.shitcoinFactory.numberOfCoins.subscribe((value: number) => {
      this.numberOfCoins = value;
      this.countToNumberOfCoins();
      for (let i = 0; i < value; i++) {
        this.shitcoinFactory.getShitcoin(i).then((shitcoin: any) => {
          this.coins.push({
            address: shitcoin.address,
            owner: shitcoin.owner,
            name: shitcoin.name,
            symbol: shitcoin.symbol,
            totalSupply: shitcoin.totalSupply / 10 ** 18,
          });
          this.recentCoins = this.coins.slice(-3);
        });
      }
    });
  }

  private countToNumberOfCoins() {
    const t = timer(0, 50);
    t.pipe(takeWhile((value: number) => value <= this.numberOfCoins)).subscribe(
      (value: number) => {
        this.numCoins = value;
      }
    );
  }

  mint() {
    this.shitcoinFactory.create(this.name, this.symbol, this.totalSupply);
  }

  scroll($element: HTMLDivElement) {
    $element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
