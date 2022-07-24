import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ChainService } from './chain.service';

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
});
