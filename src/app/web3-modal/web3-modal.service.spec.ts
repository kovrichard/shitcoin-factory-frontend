import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { generateTestingUtils } from 'eth-testing';
import { ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';
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
    expect(service.signer.getValue()).toBeInstanceOf(ethers.providers.JsonRpcSigner);
    service.ps.subscribe((value: IProvider[]) => {
      expect(value[0].name).toEqual('MetaMask');
    });
  });

  it('loadProviders should initialize providers', fakeAsync(() => {
    service.loadProviders();
    tick();

    expect(service.provider).toBeInstanceOf(ethers.providers.Web3Provider);
    expect(service.signer.getValue()).toBeInstanceOf(ethers.providers.JsonRpcSigner);
    service.account.subscribe((value: string) => {
      expect(value.toLowerCase()).toEqual(
        '0x138071e4e810f34265bd833be9c5dd96f01bd8a5'
      );
    });
  }));

  xit('open should work', fakeAsync(() => {
    const subscribeMock = spyOn(fakeProviderController.connected, 'subscribe');
    service.open();
    tick();

    expect(subscribeMock).toHaveBeenCalledOnceWith('');
  }));
});
