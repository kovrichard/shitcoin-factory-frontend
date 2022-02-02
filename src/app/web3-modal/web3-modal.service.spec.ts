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

  it('open should initialize providers', fakeAsync(() => {
    const providersMock = spyOn(service.providers, 'next');

    service.open();
    tick();

    expect(providersMock).toHaveBeenCalledOnceWith([]);
  }));

  it('open should set shouldOpen to true', fakeAsync(() => {
    const openMock = spyOn(service.shouldOpen, 'next');
    service.open();
    tick();

    expect(openMock).toHaveBeenCalledOnceWith(true);
  }));

  it('close should set shouldOpen to false', () => {
    const openMock = spyOn(service.shouldOpen, 'next');
    service.close();

    expect(openMock).toHaveBeenCalledOnceWith(false);
  });
});
