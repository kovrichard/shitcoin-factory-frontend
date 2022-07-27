import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ethers } from 'ethers';
import { ProviderController } from '../providers.service';
import { EthersProvider } from '../providers';
import { ChainService } from '../chain.service';

@Injectable()
export class Web3ModalService {
  private providerController = new ProviderController(['metamask']);

  provider: EthersProvider;
  providers = new BehaviorSubject(this.providerController.providers);
  signer = new BehaviorSubject<ethers.providers.JsonRpcSigner | EthersProvider>(
    '' as any
  );
  account = new BehaviorSubject('');
  defaultProvider = true;

  constructor(private chain: ChainService) {
    if (this.metamaskProvider()) {
      this.chain.id.next(parseInt((window as any).ethereum.chainId));

      (window as any).ethereum.on('chainChanged', () => {
        this.chain.id.next(parseInt((window as any).ethereum.chainId));
        location.reload();
      });

      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length == 0) window.localStorage.removeItem('state');
        location.reload();
      });
    }

    if (this.metamaskProvider() && this.connected()) {
      this.defaultProvider = false;
      this.provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      this.provider.send('eth_requestAccounts', []);
    }

    this.chain.networkUrl.subscribe((url: string) => {
      if (this.defaultProvider)
        this.provider = new ethers.providers.JsonRpcProvider(url);

      this.parseProvider();
    });
  }

  private parseProvider() {
    if (this.defaultProvider) {
      this.signer.next(this.provider);
      return;
    }

    this.signer.next(this.provider.getSigner());

    this.provider
      .getSigner()
      .getAddress()
      .then((address: string) => {
        this.account.next(address);
      });
  }

  open() {
    return new Promise((resolve, reject) => {
      this.providerController.chosenProvider.subscribe(
        (provider: EthersProvider) => {
          this.defaultProvider = false;
          this.provider = provider;
          provider.getNetwork().then((network: any) => {
            this.chain.id.next(parseInt(network.chainId));
          });
          window.localStorage.setItem('provider', provider.connection['url']);
          resolve(provider);
        }
      );
    });
  }

  private metamaskProvider(): boolean {
    return window.localStorage.getItem('provider') == 'metamask';
  }

  private connected(): boolean {
    return window.localStorage.getItem('state') == 'connected';
  }
}
