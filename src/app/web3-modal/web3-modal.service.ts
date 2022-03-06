import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ethers } from 'ethers';
import { ProviderController } from '../providers.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class Web3ModalService {
  private providerController = new ProviderController(['metamask']);

  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider;
  providers = new BehaviorSubject(this.providerController.providers);
  account = new BehaviorSubject('');
  signer = new BehaviorSubject<ethers.providers.JsonRpcSigner>('' as any);

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      environment.networkUrl
    );
    this.signer.next(this.provider.getSigner());
  }

  async loadProviders() {
    this.provider = new ethers.providers.Web3Provider((window as any).ethereum);
    await this.provider.send('eth_requestAccounts', []);
    this.signer.next(this.provider.getSigner());
    this.account.next(await this.signer.getValue().getAddress());
  }

  async open() {
    await new Promise((resolve, reject) => {
      this.providerController.connected.subscribe((connected: string) => {
        resolve(connected);
      });
    });
  }
}
