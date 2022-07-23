import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ChainService } from './chain.service';

describe('ChainService', () => {
  let service: ChainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const ids = [1337, 97, 56];

  ids.forEach((id: number) => {
    it(`should set bsc network url for chain id ${id}`, () => {
      service.id.next(id);
      expect(service.networkUrl).toEqual(environment.bscNetworkUrl);
    });
  });

  ids.forEach((id: number) => {
    it(`should set bsc explorer url for chain id ${id}`, () => {
      service.id.next(id);
      expect(service.explorer).toEqual(environment.bscScan);
    });
  });

  ids.forEach((id: number) => {
    it(`should set bsc contract address for chain id ${id}`, () => {
      service.id.next(id);
      expect(service.contractAddress).toEqual(environment.bscContractAddress);
    });
  });

  const ethIds = [3, 1];

  ethIds.forEach((id: number) => {
    it(`should set ethereum network url for chain id ${id}`, () => {
      service.id.next(id);
      expect(service.networkUrl).toEqual(environment.etherNetworkUrl);
    });
  });

  ethIds.forEach((id: number) => {
    it(`should set ethereum explorer url for chain id ${id}`, () => {
      service.id.next(id);
      expect(service.explorer).toEqual(environment.etherScan);
    });
  });

  ethIds.forEach((id: number) => {
    it(`should set ethereum contract address for chain id ${id}`, () => {
      service.id.next(id);
      expect(service.contractAddress).toEqual(environment.etherContractAddress);
    });
  });
});
