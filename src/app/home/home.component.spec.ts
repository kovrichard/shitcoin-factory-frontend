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
    subscribe: (func: (account: string) => void) => { func('test-account'); }
  },
  ps: {
    subscribe: () => { return Promise.resolve(''); }
  },
  s: {
    subscribe: () => { return Promise.resolve(''); }
  },
  loadProviders: () => {}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let shitcoinFactory: ShitcoinFactoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, NavbarComponent, Web3ModalComponent],
      providers: [{ provide: Web3ModalService, useValue: fakeWeb3ModalService}],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    shitcoinFactory = TestBed.inject(ShitcoinFactoryService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  })

  it('should contain navbar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const modal = compiled.querySelector('app-navbar');
    expect(modal).toBeTruthy();
  });

  fit('should save the caller', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(component.caller).toEqual('test-account');
  }));

  fit()
});
