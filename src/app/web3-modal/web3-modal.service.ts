import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ethers } from 'ethers';
import { ProviderController } from '../providers.service';

@Injectable()
export class Web3ModalService {
  private providerController = new ProviderController(['metamask']);

  p: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider;
  ps = new BehaviorSubject(this.providerController.providers);
  signer: ethers.providers.JsonRpcSigner;
  account = new BehaviorSubject('');
  s = new BehaviorSubject<ethers.providers.JsonRpcSigner>('' as any);

  constructor() {
    this.p = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    this.signer = this.p.getSigner();
  }

  async loadProviders() {
    this.p = new ethers.providers.Web3Provider((window as any).ethereum);
    await this.p.send('eth_requestAccounts', []);
    this.signer = this.p.getSigner();
    this.s.next(this.p.getSigner());
    this.account.next(await this.signer.getAddress());
  }

  async open() {
    await new Promise((resolve, reject) => {
      this.providerController.connected.subscribe((connected: string) => {
        resolve(connected);
      });
    });
  }
}
