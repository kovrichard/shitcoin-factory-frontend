import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

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
};

describe('ChainService', () => {
  let service: ChainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChainService);
  });

  it('default network should be bsc', () => {
    service.id.subscribe((id: number) => {
      expect(id).toEqual(56);
    });
    service.networkUrl.subscribe((url: string) => {
      expect(url).toEqual(environment.bscNetworkUrl);
    });
    service.explorer.subscribe((url: string) => {
      expect(url).toEqual(environment.bscScan);
    });
    service.contractAddress.subscribe((address: string) => {
      expect(address).toEqual(environment.bscContractAddress);
    });
    service.valid.subscribe((valid: boolean) => {
      expect(valid).toBeTrue();
    });
  });

  const ids = [56, 97];

  ids.forEach((id: number) => {
    it(`should set bsc network url for chain id ${id}`, () => {
      service.id.next(id);
      service.networkUrl.subscribe((url: string) => {
        expect(url).toEqual(environment.bscNetworkUrl);
      });
    });

    it(`should set bsc explorer url for chain id ${id}`, () => {
      service.id.next(id);
      service.explorer.subscribe((url: string) => {
        expect(url).toEqual(environment.bscScan);
      });
    });

    it(`should set bsc contract address for chain id ${id}`, () => {
      service.id.next(id);
      service.contractAddress.subscribe((address: string) => {
        expect(address).toEqual(environment.bscContractAddress);
      });
    });
  });

  const ethIds = [3, 1337];

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
