import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import abi from './web3-modal/factory-abi.json';

import { AbiItem } from 'web3-utils';
import { ShitcoinFactoryService } from './shitcoin-factory.service';
import { Web3ModalService } from './web3-modal/web3-modal.service';
import {Contract, ContractOptions} from 'web3-eth-contract';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

const send = {
  func: (settings: any) => {}
} 

const ContractMock = {
  methods: {
    numberOfCoins: () => { return { call: () => { return { then: (cb: any) => { cb(3)} }; } } },
    create: (name: string, ticker: string, totalSupply: number) => { return { send: send.func } },
    getShitcoin: (index: number) => { return { call: () => { return 'shitcoin' } } }
  }
}

describe('ShitcoinFactoryService', () => {
  let service: ShitcoinFactoryService;
  let web3service: Web3ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Web3ModalService,
      ]
    });
    service = TestBed.inject(ShitcoinFactoryService);
    service.factory = ContractMock as unknown as Contract;
    web3service = TestBed.inject(Web3ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set default values', () => {
    expect(service.factoryAbi).toEqual(abi as AbiItem[]);
    expect(service.contractAddress).toEqual(environment.contractAddress);
  });

  xit('numberOfCoins should work', fakeAsync(() => {
    web3service.providerSet.next(true);
    tick();
    const result: number[] = [];
    service.numberOfCoinsObservable().subscribe((value) => {
      result.push(value);
    });
    tick();
    expect(result[0]).toEqual(3);
  }));

  it('create should call factory with correct parameters', async () => {
    const createMock = spyOn(ContractMock.methods, 'create').and.returnValue({send: send.func});
    await service.create('Test Coin', 'TEST', 100);
    
    expect(createMock).toHaveBeenCalledOnceWith('Test Coin', 'TEST', 100);
  });
  
  it('create should call factory from correct address', async () => {
    const sendMock = spyOn(send, 'func');
    web3service.account = 'test-account';
    await service.create('Test Coin', 'TEST', 100);
    
    expect(sendMock).toHaveBeenCalledOnceWith({from: 'test-account'});
  })

  it('getShitcoin should work', async () => {
    const shitcoin = await service.getShitcoin(1);

    expect(shitcoin).toEqual('shitcoin');
  });
});
