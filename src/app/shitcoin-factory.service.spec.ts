import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import abi from './web3-modal/factory-abi.json';
import shitcoinAbi from './web3-modal/shitcoin.json';

import { Contract, ContractInterface } from 'ethers';
import { ShitcoinFactoryService } from './shitcoin-factory.service';
import { Web3ModalService } from './web3-modal/web3-modal.service';
import { generateTestingUtils } from 'eth-testing';
import { TestingUtils } from 'eth-testing/lib/testing-utils';
import { fakeWeb3ModalService } from './web3-modal/web3-modal.service.spec';

const ContractMock = {
  numberOfCoins: () => {
    return Promise.resolve(3);
  },
  create: (
    name: string,
    ticker: string,
    totalSupply: number,
    settings: any
  ) => {},
  getShitcoin: (index: number) => {
    return Promise.resolve('shitcoin');
  },
};

function subscribe(returnValue: any) {
  return (cb: any) => {
    cb(returnValue);
    return {
      unsubscribe: () => {},
    };
  };
}

export const fakeShitcoinFactoryService = {
  numberOfCoins: {
    subscribe: subscribe(1),
  },
  payable: {
    subscribe: subscribe(false),
  },
  cost: {
    subscribe: subscribe(1),
  },
  costCoin: {
    subscribe: subscribe(''),
  },
  getShitcoin: (i: number) => {
    return Promise.resolve({
      address: 'test-address',
      owner: 'test-owner',
      name: 'Test coin',
      symbol: 'TESTCOIN',
      totalSupply: 42 * 10 ** 18,
    });
  },
  create: (name: string, symbol: string, supply: number) => {},
  approve: () => {},
};

describe('ShitcoinFactoryService', () => {
  let service: ShitcoinFactoryService;
  let testingUtils: TestingUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShitcoinFactoryService,
        {
          provide: Web3ModalService,
          useValue: fakeWeb3ModalService,
        },
        {
          provide: Contract,
          useValue: ContractMock,
        },
      ],
    });
    testingUtils = generateTestingUtils({ providerType: 'MetaMask' });
    (window as any).ethereum = testingUtils.getProvider();
    service = TestBed.inject(ShitcoinFactoryService);
    service.factory = ContractMock as unknown as Contract;
  });

  xit('should set default values', () => {
    expect(service.factoryAbi).toEqual(abi as ContractInterface);
    expect(service.shitcoinAbi).toEqual(shitcoinAbi as ContractInterface);
    service.numberOfCoins.subscribe((value: number) => {
      expect(value).toEqual(0);
    });
  });

  xit('numberOfCoins should work', fakeAsync(() => {
    const result: number[] = [];
    service.numberOfCoins.subscribe((value: number) => {
      result.push(value);
    });
    tick();
    expect(result[1]).toEqual(3);
  }));

  xit('create should call factory', () => {
    const createMock = spyOn(ContractMock, 'create');
    service.create('Test Coin', 'TEST', 100);

    expect(createMock).toHaveBeenCalledOnceWith('Test Coin', 'TEST', 100, {
      from: 'test-account',
    });
  });

  xit('getShitcoin should work', () => {
    service.getShitcoin(1).then((address: string) => {
      expect(address).toEqual('shitcoin');
    });
  });
});
