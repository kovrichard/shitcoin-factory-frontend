import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Web3ModalComponent } from './web3-modal.component';
import { Web3ModalService } from './web3-modal.service';
import { MatIconModule } from '@angular/material/icon';
import { fakeWeb3ModalService } from './web3-modal.service.spec';
import { TestScheduler } from 'rxjs/testing';
import { EMPTY } from 'rxjs';
import { ChainService } from '../chain.service';


describe('Web3ModalComponent', () => {
  let component: Web3ModalComponent;
  let fixture: ComponentFixture<Web3ModalComponent>;
  let testScheduler: TestScheduler;
  let chain = { logo: EMPTY, valid: EMPTY };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [Web3ModalComponent],
      providers: [
        {
          provide: Web3ModalService,
          useValue: fakeWeb3ModalService,
        },
        {
          provide: ChainService,
          useValue: chain,
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    testScheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });

    fixture = TestBed.createComponent(Web3ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set default parameters', () => {
    expect(component.open).toBeFalse();
    expect(component.validChain).toBeTrue();
  });

  it('should get providers from service', fakeAsync(() => {
    expect(component.providers[0].name).toEqual('MetaMask');
    expect(component.providers[0].logo).toEqual('/assets/MetaMask.svg');
  }));

  xit('should get account from service', fakeAsync(() => {
    expect(component.account).toEqual('test-account');
  }));

  [true, false].forEach((validity: boolean) => {
    it(`should get validity ${validity} from chain`, () => {
      testScheduler.run((helpers: any) => {
        const { cold, expectObservable } = helpers;

        const expected = cold('a', { a: validity});
        chain.valid = expected;
        component.ngOnInit();

        expectObservable(component.validChain$).toEqual(expected);
      });
    });
  });

  it('should get logo from chain', () => {
    testScheduler.run((helpers: any) => {
      const { cold, expectObservable } = helpers;

      const expected = cold('a', { a: 'test-img.svg' });
      chain.logo = expected;
      component.ngOnInit();

      expectObservable(component.logo$).toEqual(expected);
    });
  });

  it('connect should set open to false', fakeAsync(() => {
    component.connect();
    tick();

    expect(component.open).toBeFalse();
  }));

  it('close should set open to false', () => {
    component.open = true;
    expect(component.open).toBeTrue();

    component.close(new Event('test-event'));
    expect(component.open).toBeFalse();
  });

  it('close should stop event propagation', () => {
    const eventMock = new Event('Mock');
    const stopMock = spyOn(eventMock, 'stopPropagation');
    component.close(eventMock);
    expect(stopMock).toHaveBeenCalledOnceWith();
  });
});
