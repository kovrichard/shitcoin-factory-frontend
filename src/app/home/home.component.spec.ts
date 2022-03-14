import {
  ComponentFixture,
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NavbarComponent } from '../navbar/navbar.component';
import { ShitcoinFactoryService } from '../shitcoin-factory.service';
import { Web3ModalComponent } from '../web3-modal/web3-modal.component';
import { Web3ModalService } from '../web3-modal/web3-modal.service';
import { generateTestingUtils } from 'eth-testing';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ShadowCardComponent } from '../shadow-card/shadow-card.component';

export const fakeWeb3ModalService = {
  account: {
    subscribe: (func: (account: string) => void) => {
      func('test-account');
    },
  },
  providers: {
    subscribe: (value: any) => {
      value.next([
        {
          name: 'MetaMask',
          logo: '/assets/MetaMask.svg',
          onClick: () => {},
        },
      ]);
    },
  },
  signer: {
    subscribe: (cb: any) => {},
  },
  open: () => {},
};

export const fakeShitcoinFactoryService = {
  numberOfCoins: {
    subscribe: (cb: any) => {
      cb(1);
    },
  },
  getShitcoin: (i: number) => {
    return Promise.resolve('test-address');
  },
  getShitcoinOwner: (address: string) => {
    return Promise.resolve('test-owner');
  },
  getShitcoinName: (address: string) => {
    return Promise.resolve('Test coin');
  },
  getShitcoinSymbol: (address: string) => {
    return Promise.resolve('TESTCOIN');
  },
  getShitcoinTotalSupply: (address: string) => {
    return Promise.resolve(42 * 10 ** 18);
  },
  create: (name: string, symbol: string, supply: number) => {},
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        FormsModule,
        MatGridListModule,
        MatListModule,
        ScrollingModule,
      ],
      declarations: [HomeComponent, NavbarComponent, Web3ModalComponent, ShadowCardComponent],
      providers: [
        { provide: Web3ModalService, useValue: fakeWeb3ModalService },
        {
          provide: ShitcoinFactoryService,
          useValue: fakeShitcoinFactoryService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });
    (window as any).ethereum = testingUtils.getProvider();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should set default values', () => {
    expect(component.coins).toEqual([]);
    expect(component.name).toEqual('');
    expect(component.symbol).toEqual('');
  });

  it('should save the caller', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(component.caller).toEqual('test-account');
    discardPeriodicTasks();
  }));

  it('should save coins', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(component.coins.length).toEqual(1);
    expect(component.coins[0].address).toEqual('test-address');
    expect(component.coins[0].owner).toEqual('test-owner');
    expect(component.coins[0].name).toEqual('Test coin');
    expect(component.coins[0].symbol).toEqual('TESTCOIN');
    expect(component.coins[0].totalSupply).toEqual(42);
    discardPeriodicTasks();
  }));

  it('mint should call create', fakeAsync(() => {
    component.name = 'Coin name';
    component.symbol = 'RANDOMCOIN';
    component.totalSupply = 300;
    const createMock = spyOn(fakeShitcoinFactoryService, 'create');
    component.mint();

    expect(createMock).toHaveBeenCalledOnceWith('Coin name', 'RANDOMCOIN', 300);
  }));
});
