import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { TestScheduler } from 'rxjs/testing';

import { ChainService } from './chain.service';

export const fakeChainService = {
  explorer: {
    subscribe: (cb: any) => {
      cb('');
      return {
        unsubscribe: () => {},
      };
    },
  },
  valid: {
    subscribe: (cb: any) => {
      cb('');
      return {
        unsubscribe: () => {},
      };
    },
  },
  logo: {
    subscribe: (cb: any) => {
      cb('test.svg');
      return {
        unsubscribe: () => {},
      };
    },
  },
};

describe('ChainService', () => {
  let service: ChainService;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChainService);

    testScheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });

  it('default network should be bsc', () => {
    testScheduler.run((helpers: any) => {
      const { cold, expectObservable } = helpers;
      const obsStub = '^';

      const idExpected = cold('a', { a: 56 });
      expectObservable(service.id, obsStub).toEqual(idExpected);

      const urlExpected = cold('a', { a: environment.bscNetworkUrl });
      expectObservable(service.networkUrl, obsStub).toEqual(urlExpected);

      const explorerExpected = cold('a', { a: environment.bscScan });
      expectObservable(service.explorer, obsStub).toEqual(explorerExpected);

      const addressExpected = cold('a', { a: environment.bscContractAddress });
      expectObservable(service.contractAddress, obsStub).toEqual(addressExpected);

      const validExpected = cold('a', { a: true });
      expectObservable(service.valid, obsStub).toEqual(validExpected);

      const obsExpected = cold('a', { a: 'bnb-logo.svg' });
      expectObservable(service.logo, obsStub).toEqual(obsExpected);
    });
  });

  const ids = [56, 97];

  ids.forEach((id: number) => {
    it(`should set bsc network for chain id ${id}`, () => {
      testScheduler.run((helpers: any) => {
        const { cold, expectObservable } = helpers;
        
        service.id.next(id);
        const obsStub = '^';

        const idExpected = cold('a', { a: id });
        expectObservable(service.id, obsStub).toEqual(idExpected);

        const urlExpected = cold('a', { a: environment.bscNetworkUrl });
        expectObservable(service.networkUrl, obsStub).toEqual(urlExpected);

        const explorerExpected = cold('a', { a: environment.bscScan });
        expectObservable(service.explorer, obsStub).toEqual(explorerExpected);

        const addressExpected = cold('a', { a: environment.bscContractAddress });
        expectObservable(service.contractAddress, obsStub).toEqual(addressExpected);

        const validExpected = cold('a', { a: true });
        expectObservable(service.valid, obsStub).toEqual(validExpected);

        const obsExpected = cold('a', { a: 'bnb-logo.svg' });
        expectObservable(service.logo, obsStub).toEqual(obsExpected);
      });
    });
  });

  const ethIds = [1, 3, 1337];

  ethIds.forEach((id: number) => {
    it(`should set ethereum network url for chain id ${id}`, () => {
      service.id.next(id);
      service.networkUrl.subscribe((url: string) => {
        expect(url).toEqual(environment.etherNetworkUrl);
      });
    });

    it(`should set ethereum explorer url for chain id ${id}`, () => {
      service.id.next(id);
      service.explorer.subscribe((url: string) => {
        expect(url).toEqual(environment.etherScan);
      });
    });

    it(`should set ethereum contract address for chain id ${id}`, () => {
      service.id.next(id);
      service.contractAddress.subscribe((address: string) => {
        expect(address).toEqual(environment.etherContractAddress);
      });
    });

    it(`should set ethereum logo for chain id ${id}`, () => {
      service.id.next(id);
      service.logo.subscribe((logo: string) => {
        expect(logo).toEqual('ethereum-logo.svg');
      });
    });
  });

  const polygonIds = [137, 80001];

  polygonIds.forEach((id: number) => {
    it(`should set polygon network url for chain id ${id}`, () => {
      service.id.next(id);
      service.networkUrl.subscribe((url: string) => {
        expect(url).toEqual(environment.polygonNetworkUrl);
      });
    });

    it(`should set polygon explorer url for chain id ${id}`, () => {
      service.id.next(id);
      service.explorer.subscribe((url: string) => {
        expect(url).toEqual(environment.polygonScan);
      });
    });

    it(`should set polygon contract address for chain id ${id}`, () => {
      service.id.next(id);
      service.contractAddress.subscribe((address: string) => {
        expect(address).toEqual(environment.polygonContractAddress);
      });
    });
    it(`should set polygon logo for chain id ${id}`, () => {
      service.id.next(id);
      service.logo.subscribe((logo: string) => {
        expect(logo).toEqual('polygon-logo.svg');
      });
    });
  });

  const invalidIds = [4, 8, 15, 16, 23, 42];

  invalidIds.forEach((id: number) => {
    it(`should detect invalid id ${id}`, () => {
      service.id.next(id);
      service.valid.subscribe((valid: boolean) => {
        expect(valid).toBeFalse();
      });
    });
  });
});
