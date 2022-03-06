import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { generateTestingUtils } from 'eth-testing';
import { Web3ModalService } from './web3-modal.service';

describe('Web3ModalService', () => {
  let service: Web3ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [Web3ModalService],
    }).compileComponents();

    const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });
    (window as any).ethereum = testingUtils.getProvider();
  });

  beforeEach(() => {
    service = TestBed.inject(Web3ModalService);
  });

  it('loadProviders should initialize providers', fakeAsync(() => {
    service.loadProviders();
    tick();
  }));
});
