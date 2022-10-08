import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShitcoinFactoryService } from '../shitcoin-factory.service';
import {
  Observable,
  Subscription,
  combineLatest,
  map,
  takeWhile,
  timer,
} from 'rxjs';
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
export class HomeComponent implements OnInit, OnDestroy {
  private breakpointsSubscription: Subscription;
  private numCoinsSubscription: Subscription;

  payable$: Observable<boolean>;

  private numberOfCoins = 0;
  numCoins = 0;
  coins: Shitcoin[] = [];
  name = '';
  symbol = '';
  totalSupply: number;
  explorer$: Observable<string>;
  cost$: Observable<number>;
  costCoin$: Observable<string>;

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
    this.breakpointsSubscription = this.breakpoints
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

    this.explorer$ = this.chain.explorer;

    this.numCoinsSubscription = this.shitcoinFactory.numberOfCoins.subscribe(
      (value: number) => {
        this.numberOfCoins = value;
        this.fetchCoins();
      }
    );
    this.payable$ = this.shitcoinFactory.payable$;
    this.cost$ = combineLatest(
      this.shitcoinFactory.cost$,
      this.shitcoinFactory.costDecimals$
    ).pipe(map((costInfo: any[]) => Number(costInfo[0]) / 10 ** costInfo[1]));
    this.costCoin$ = this.shitcoinFactory.costCoin$;
  }

  ngOnDestroy() {
    this.breakpointsSubscription.unsubscribe();
    this.numCoinsSubscription.unsubscribe();
  }

  private fetchCoins() {
    this.countToNumberOfCoins();
    const requests = [];
    for (let i = 0; i < this.numberOfCoins; i++) {
      requests.push(this.shitcoinFactory.getShitcoin(i));
    }
    Promise.all(requests).then((coins: any) => {
      this.coins = coins.map((shitcoin: Shitcoin) => this.remapCoin(shitcoin));
    });
  }

  private remapCoin(shitcoin: Shitcoin) {
    const coin = shitcoin;
    coin.totalSupply /= 10 ** 18;
    return coin;
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

  approve() {
    this.shitcoinFactory.approve();
  }

  scroll($element: HTMLDivElement) {
    $element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
