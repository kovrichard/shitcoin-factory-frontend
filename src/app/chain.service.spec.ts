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
      expectObservable(service.contractAddress, obsStub).toEqual(
        addressExpected
      );

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

        const addressExpected = cold('a', {
          a: environment.bscContractAddress,
        });
        expectObservable(service.contractAddress, obsStub).toEqual(
          addressExpected
        );

        const validExpected = cold('a', { a: true });
        expectObservable(service.valid, obsStub).toEqual(validExpected);

        const obsExpected = cold('a', { a: 'bnb-logo.svg' });
        expectObservable(service.logo, obsStub).toEqual(obsExpected);
      });
    });
  });

  const ethIds = [1, 3, 1337];

  ethIds.forEach((id: number) => {
    it(`should set ethereum network for chain id ${id}`, () => {
      testScheduler.run((helpers: any) => {
        const { cold, expectObservable } = helpers;

        service.id.next(id);
        const obsStub = '^';

        const idExpected = cold('a', { a: id });
        expectObservable(service.id, obsStub).toEqual(idExpected);

        const urlExpected = cold('a', { a: environment.etherNetworkUrl });
        expectObservable(service.networkUrl, obsStub).toEqual(urlExpected);

        const explorerExpected = cold('a', { a: environment.etherScan });
        expectObservable(service.explorer, obsStub).toEqual(explorerExpected);

        const addressExpected = cold('a', {
          a: environment.etherContractAddress,
        });
        expectObservable(service.contractAddress, obsStub).toEqual(
          addressExpected
        );

        const validExpected = cold('a', { a: true });
        expectObservable(service.valid, obsStub).toEqual(validExpected);

        const obsExpected = cold('a', { a: 'ethereum-logo.svg' });
        expectObservable(service.logo, obsStub).toEqual(obsExpected);
      });
    });
  });

  const polygonIds = [137, 80001];

  polygonIds.forEach((id: number) => {
    it(`should set polygon network for chain id ${id}`, () => {
      testScheduler.run((helpers: any) => {
        const { cold, expectObservable } = helpers;

        service.id.next(id);
        const obsStub = '^';

        const idExpected = cold('a', { a: id });
        expectObservable(service.id, obsStub).toEqual(idExpected);

        const urlExpected = cold('a', { a: environment.polygonNetworkUrl });
        expectObservable(service.networkUrl, obsStub).toEqual(urlExpected);

        const explorerExpected = cold('a', { a: environment.polygonScan });
        expectObservable(service.explorer, obsStub).toEqual(explorerExpected);

        const addressExpected = cold('a', {
          a: environment.polygonContractAddress,
        });
        expectObservable(service.contractAddress, obsStub).toEqual(
          addressExpected
        );

        const validExpected = cold('a', { a: true });
        expectObservable(service.valid, obsStub).toEqual(validExpected);

        const obsExpected = cold('a', { a: 'polygon-logo.svg' });
        expectObservable(service.logo, obsStub).toEqual(obsExpected);
      });
    });
  });

  const invalidIds = [4, 8, 15, 16, 23, 42];

  invalidIds.forEach((id: number) => {
    it(`should detect invalid id ${id}`, () => {
      testScheduler.run((helpers: any) => {
        const { cold, expectObservable } = helpers;

        service.id.next(id);
        const obsExpected = cold('a', { a: false });
        expectObservable(service.valid, '^').toEqual(obsExpected);
      });
    });
  });
});
