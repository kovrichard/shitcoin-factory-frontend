import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ethers } from 'ethers';
import { ProviderController } from '../providers.service';
import { environment } from 'src/environments/environment';
import { EthersProvider } from '../providers';

@Injectable()
export class Web3ModalService {
  private providerController = new ProviderController(['metamask']);

  provider: EthersProvider;
  providers = new BehaviorSubject(this.providerController.providers);
  signer = new BehaviorSubject<ethers.providers.JsonRpcSigner | EthersProvider>(
    '' as any
  );
  account = new BehaviorSubject('');

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      environment.bscNetworkUrl
    );
    this.parseProvider(this.provider, true);
  }

  private parseProvider(provider: EthersProvider, defaultProvider = false) {
    this.provider = provider;

    if (defaultProvider) {
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

  async open() {
    await new Promise((resolve, reject) => {
      this.providerController.chosenProvider.subscribe(
        (provider: EthersProvider) => {
          this.parseProvider(provider);
          window.localStorage.setItem('provider', provider.connection['url']);
          resolve(provider);
        }
      );
    });
  }
}
