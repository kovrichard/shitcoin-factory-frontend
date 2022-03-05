import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import abi from './web3-modal/factory-abi.json';
import shitcoinAbi from './web3-modal/shitcoin.json';

import { ContractInterface } from 'ethers';
import { ShitcoinFactoryService } from './shitcoin-factory.service';
import { Web3ModalService } from './web3-modal/web3-modal.service';
import { Contract } from 'web3-eth-contract';
import { environment } from 'src/environments/environment';
import { fakeWeb3ModalService } from './home/home.component.spec';

const send = {
  func: (settings: any) => {},
};

const ContractMock = {
  methods: {
    numberOfCoins: () => {
      return {
        call: () => {
          return {
            then: (cb: any) => {
              cb(3);
            },
          };
        },
      };
    },
    create: (name: string, ticker: string, totalSupply: number) => {
      return { send: send.func };
    },
    getShitcoin: (index: number) => {
      return {
        call: () => {
          return 'shitcoin';
        },
      };
    },
  },
};

describe('ShitcoinFactoryService', () => {
  let service: ShitcoinFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShitcoinFactoryService,
        {
          provide: Web3ModalService,
          useValue: fakeWeb3ModalService,
        },
      ],
    });
    service = TestBed.inject(ShitcoinFactoryService);
    service.factory = ContractMock as unknown as Contract;
  });

  it('should set default values', () => {
    expect(service.factoryAbi).toEqual(abi as ContractInterface);
    expect(service.shitcoinAbi).toEqual(shitcoinAbi as ContractInterface);
    expect(service.contractAddress).toEqual(environment.contractAddress);
  });

  xit('numberOfCoins should work', fakeAsync(() => {
    tick();
    const result: number[] = [];
    service.numberOfCoins.subscribe((value: number) => {
      result.push(value);
    });
    tick();
    expect(result[0]).toEqual(3);
  }));

  it('create should call factory with correct parameters', async () => {
    const createMock = spyOn(ContractMock.methods, 'create').and.returnValue({
      send: send.func,
    });
    await service.create('Test Coin', 'TEST', 100);

    expect(createMock).toHaveBeenCalledOnceWith('Test Coin', 'TEST', 100);
  });

  it('create should call factory from correct address', async () => {
    const sendMock = spyOn(send, 'func');
    service.create('Test Coin', 'TEST', 100);

    expect(sendMock).toHaveBeenCalledOnceWith({ from: 'test-account' });
  });

  it('getShitcoin should work', async () => {
    const shitcoin = await service.getShitcoin(1);

    expect(shitcoin).toEqual('shitcoin');
  });
});
