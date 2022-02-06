import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Web3ModalService } from './web3-modal.service';

describe('Web3ModalComponent', () => {
  let service: Web3ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [Web3ModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(Web3ModalService);
  });

  it('loadProviders should initialize providers', fakeAsync(() => {
    const providersMock = spyOn(service.providers, 'next');

    service.loadProviders();
    tick();

    expect(providersMock).toHaveBeenCalledOnceWith([]);
  }));
});
