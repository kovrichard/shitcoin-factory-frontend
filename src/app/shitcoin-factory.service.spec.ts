import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import abi from './web3-modal/factory-abi.json';

import { AbiItem } from 'web3-utils';
import { ShitcoinFactoryService } from './shitcoin-factory.service';
import { Web3ModalService } from './web3-modal/web3-modal.service';
import {Contract, ContractOptions} from 'web3-eth-contract';


const send = {
  func: (settings: any) => {}
} 

const ContractMock = {
  methods: {
    numberOfCoins: () => { return { call: () => { return 3; } } },
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
    expect(service.contractAddress).toEqual('0xfa448a6573D5c090FB353FE686a33EC93BdDaa3C');
  });

  it('numberOfCoins should work', async () => {
    const numCoins = await service.numberOfCoins();

    expect(numCoins).toEqual(3);
  });

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
