import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { generateTestingUtils } from 'eth-testing';
import { ethers } from 'ethers';
import { IProvider } from '../providers';
import { ProviderController } from '../providers.service';
import { Web3ModalService } from './web3-modal.service';

const fakeProviderController = {
  connected: {
    subscribe: (cb: any) => {
      console.log('no');
      cb('what');
    },
  },
};

export const fakeWeb3ModalService = {
  account: {
    subscribe: (func: (account: string) => void) => {
      func('test-account');
      return {
        unsubscribe: () => {},
      };
    },
    value: 'test-account'
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
      return {
        unsubscribe: () => {},
      };
    },
  },
  signer: {
    subscribe: (cb: any) => {},
  },
  open: () => {
    return Promise.resolve();
  },
};

describe('Web3ModalService', () => {
  let service: Web3ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        Web3ModalService,
        {
          provide: ProviderController,
          useValue: fakeProviderController,
        },
      ],
    }).compileComponents();

    const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });
    testingUtils.mockAccounts(['0x138071e4e810f34265bd833be9c5dd96f01bd8a5']);
    testingUtils.mockRequestAccounts([
      '0x138071e4e810f34265bd833be9c5dd96f01bd8a5',
    ]);
    (window as any).ethereum = testingUtils.getProvider();
  });

  beforeEach(() => {
    service = TestBed.inject(Web3ModalService);
  });

  it('should set default values', () => {
    expect(service.provider).toBeInstanceOf(ethers.providers.JsonRpcProvider);
    service.account.subscribe((value: string) => {
      expect(value).toEqual('');
    });
    expect(service.signer.getValue()).toBeInstanceOf(
      ethers.providers.JsonRpcProvider
    );
    service.providers.subscribe((value: IProvider[]) => {
      expect(value[0].name).toEqual('MetaMask');
    });
  });

  xit('open should work', fakeAsync(() => {
    const subscribeMock = spyOn(fakeProviderController.connected, 'subscribe');
    service.open();
    tick();

    expect(subscribeMock).toHaveBeenCalledOnceWith('');
  }));
});
