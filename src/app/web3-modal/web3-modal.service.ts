import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ethers } from 'ethers';
import { ProviderController } from '../providers.service';
import { environment } from 'src/environments/environment';
import { EthersProvider, IProvider } from '../providers';

@Injectable()
export class Web3ModalService {
  private providerController = new ProviderController(['metamask']);

  provider: EthersProvider;
  providers = new BehaviorSubject(this.providerController.providers);
  signer = new BehaviorSubject<ethers.providers.JsonRpcSigner | EthersProvider>('' as any);
  account = new BehaviorSubject('');

  constructor() {
    this.parseProvider(new ethers.providers.JsonRpcProvider(
      environment.networkUrl
    ), true);
  }

  private parseProvider(provider: EthersProvider, defaultProvider = false) {
    this.provider = provider;

    if (defaultProvider) {
      this.signer.next(this.provider);
    } else {
      this.signer.next(this.provider.getSigner());
      
      this.provider.getSigner().getAddress().then((address: string) => {
        this.account.next(address);
      });
    }
  }

  async open() {
    await new Promise((resolve, reject) => {
      this.providerController.chosenProvider.subscribe((provider: EthersProvider) => {
        this.parseProvider(provider);
        resolve(provider);
      });
    });
  }
}
