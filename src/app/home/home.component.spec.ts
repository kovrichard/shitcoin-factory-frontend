import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NavbarComponent } from '../navbar/navbar.component';
import { ShitcoinFactoryService } from '../shitcoin-factory.service';
import { Web3ModalComponent } from '../web3-modal/web3-modal.component';
import { Web3ModalService } from '../web3-modal/web3-modal.service';

import { HomeComponent } from './home.component';

const fakeWeb3ModalService = {
  account: {
    subscribe: (func: (account: string) => void) => {
      func('test-account');
    },
  },
  ps: {
    subscribe: () => {
      return Promise.resolve('');
    },
  },
  s: {
    subscribe: () => {
      return Promise.resolve('');
    },
  },
  loadProviders: () => {},
};

const fakeShitcoinFactoryService = {
  numberOfCoins: {
    subscribe: (a: any) => {
      a(1);
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
      declarations: [HomeComponent, NavbarComponent, Web3ModalComponent],
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
