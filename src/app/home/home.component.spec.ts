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
import { EMPTY, of } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ChainService } from '../chain.service';
import { fakeWeb3ModalService } from '../web3-modal/web3-modal.service.spec';
import { fakeShitcoinFactoryService } from '../shitcoin-factory.service.spec';
import { TestScheduler } from 'rxjs/testing';

const fakeBreakpointObserver = {
  observe: (input: any) => {
    return {
      subscribe: (cb: any) => {
        return {
          unsubscribe: () => {},
        };
      },
    };
  },
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let testingUtils: any;
  let testScheduler: TestScheduler;
  const chain = { explorer: EMPTY };

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
        {
          provide: BreakpointObserver,
          useValue: fakeBreakpointObserver,
        },
        {
          provide: ChainService,
          useValue: chain,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    testScheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });

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
    expect(component.numCoins).toEqual(0);
    expect(component.coins).toEqual([]);
    expect(component.name).toEqual('');
    expect(component.symbol).toEqual('');

    expect(component.outerDiameter).toEqual(280);
    expect(component.middleDiameter).toEqual(218);
    expect(component.innerDiameter).toEqual(156);
    expect(component.aboutDiameter).toEqual(218);
  });

  it('should get explorer from chain', () => {
    testScheduler.run((helpers: any) => {
      const { cold, expectObservable } = helpers;

      const expected = cold('a', { a: 'test explorer' });
      chain.explorer = expected;
      component.ngOnInit();

      expectObservable(component.explorer$).toEqual(expected);
    });
  });

  [true, false].forEach((payable: boolean) => {
    it(`should get payable ${payable} from factory service`, () => {
      testScheduler.run((helpers: any) => {
        const { cold, expectObservable } = helpers;

        const expected = cold('a', { a: payable });
        fakeShitcoinFactoryService.payable$ = expected;
        component.ngOnInit();

        expectObservable(component.payable$).toEqual(expected);
      });
    });
  });

  it('should convert cost to number from factory service', () => {
    testScheduler.run((helpers: any) => {
      const { cold, expectObservable } = helpers;

      const costStub = cold('a', { a: BigInt(108 * 10 ** 6) });
      const decimalsStub = cold('a', { a: 6 });
      const expected = cold('a', { a: 108 });
      fakeShitcoinFactoryService.cost$ = costStub;
      fakeShitcoinFactoryService.costDecimals$ = decimalsStub;
      component.ngOnInit();

      expectObservable(component.cost$).toEqual(expected);
    });
  });

  it('should get cost coin from factory service', () => {
    testScheduler.run((helpers: any) => {
      const { cold, expectObservable } = helpers;

      const expected = cold('a', { a: '0x123456789' });
      fakeShitcoinFactoryService.costCoin$ = expected;
      component.ngOnInit();

      expectObservable(component.costCoin$).toEqual(expected);
    });
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

  it('approve should call approve', fakeAsync(() => {
    const approveMock = spyOn(fakeShitcoinFactoryService, 'approve');
    component.approve();

    expect(approveMock).toHaveBeenCalledOnceWith();
  }));
});
