import { fakeAsync, tick } from '@angular/core/testing';
import { generateTestingUtils } from 'eth-testing';
import { EthersProvider, MetaMask } from './providers';
import { Subject } from 'rxjs';
import { ethers } from 'ethers';

describe('Providers', () => {
  beforeEach(() => {
    const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });
    (window as any).ethereum = testingUtils.getProvider();
  });

  it('MetaMask provider should set default values', () => {
    const testSubject = new Subject<EthersProvider>();
    const metamask = new MetaMask(testSubject);

    expect(metamask.name).toEqual('MetaMask');
    expect(metamask.logo).toEqual('/assets/MetaMask.svg');
  });

  it('MetaMask onClick should call subject next', fakeAsync(() => {
    const fakeSubject: Subject<EthersProvider> | any = {
      next: (_: string) => {},
    };
    const metamask = new MetaMask(fakeSubject);
    const nextMock = spyOn(fakeSubject, 'next');
    metamask.onClick();
    tick();

    expect(nextMock.calls.first().args[0]).toBeInstanceOf(
      ethers.providers.Web3Provider
    );
  }));
});
