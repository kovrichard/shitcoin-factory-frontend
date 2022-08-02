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

  it('default network should be ethereum', () => {
    service.id.subscribe((id: number) => {
      expect(id).toEqual(1);
    });
    service.networkUrl.subscribe((url: string) => {
      expect(url).toEqual(environment.etherNetworkUrl);
    });
    service.explorer.subscribe((url: string) => {
      expect(url).toEqual(environment.etherScan);
    });
    service.contractAddress.subscribe((address: string) => {
      expect(address).toEqual(environment.etherContractAddress);
    });
    service.valid.subscribe((valid: boolean) => {
      expect(valid).toBeTrue();
    });
  });

  const ids = [97, 56];

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

  const ethIds = [1337, 3];

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
