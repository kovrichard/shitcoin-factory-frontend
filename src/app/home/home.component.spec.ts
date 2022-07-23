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

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { of } from 'rxjs';

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
    return Promise.resolve({
      address: 'test-address',
      owner: 'test-owner',
      name: 'Test coin',
      symbol: 'TESTCOIN',
      totalSupply: 42 * 10 ** 18,
    });
  },
  create: (name: string, symbol: string, supply: number) => {},
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let testingUtils: any;

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
        MatProgressSpinnerModule,
        ScrollingModule,
      ],
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
    testingUtils = generateTestingUtils({ providerType: 'MetaMask' });
    (window as any).ethereum = testingUtils.getProvider();
    (window as any).ethereum.getNetwork = () => {
      return of({ chainId: 1 });
    };
  });

  afterEach(() => {
    testingUtils.clearAllMocks();
    fixture.destroy();
  });

  it('should set default values', () => {
    expect(component.coins).toEqual([]);
    expect(component.name).toEqual('');
    expect(component.symbol).toEqual('');
  });

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
