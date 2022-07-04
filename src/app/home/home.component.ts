import { Component, OnInit } from '@angular/core';
import { ShitcoinFactoryService } from '../shitcoin-factory.service';
import { Web3ModalService } from '../web3-modal/web3-modal.service';
import { takeWhile, timer } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  name = '';
  symbol = '';
  totalSupply: number;
  caller = '';

  outerDiameter = 280;
  middleDiameter = 218;
  innerDiameter = 156;
  aboutDiameter = 218;

  constructor(
    private shitcoinFactory: ShitcoinFactoryService,
    private web3service: Web3ModalService,
    private breakpoints: BreakpointObserver
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

    this.web3service.account.subscribe((account: string) => {
      this.caller = account;
    });

    this.shitcoinFactory.numberOfCoins.subscribe(async (value: number) => {
      this.numberOfCoins = value;
      this.countToNumberOfCoins();
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
