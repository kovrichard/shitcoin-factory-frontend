import { EventEmitter, Inject, Injectable, Optional } from '@angular/core';
import {
  CONNECT_EVENT,
  IProviderOptions,
  IProviderUserOptions,
  Web3WalletConnector,
} from '@mindsorg/web3modal-ts';
import { BehaviorSubject, Observable } from 'rxjs';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { provider } from 'web3-core';

interface IProviderControllerOptions {
  disableInjectedProvider: boolean;
  cacheProvider: boolean;
  providerOptions: IProviderOptions;
  network: string;
}

@Injectable()
export class Web3ModalService {
  private web3WalletConnector: Web3WalletConnector;

  public providers: EventEmitter<IProviderUserOptions[]> = new EventEmitter();
  p: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider;
  signer: ethers.providers.JsonRpcSigner;
  private account = new BehaviorSubject('');
  s = new BehaviorSubject<ethers.providers.JsonRpcSigner>('' as any);

  constructor(
    @Inject('configOptions')
    @Optional()
    configOptions: IProviderControllerOptions
  ) {
    this.web3WalletConnector = new Web3WalletConnector(configOptions);
    this.p = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    this.account.next('');
    this.signer = this.p.getSigner();
  }

  async loadProviders() {
    this.providers.next(this.web3WalletConnector.providers);
    this.p = new ethers.providers.Web3Provider((window as any).ethereum);
    await this.p.send('eth_requestAccounts', []);
    this.signer = this.p.getSigner();
    this.s.next(this.p.getSigner());
    this.account.next(await this.signer.getAddress());
  }

  async open() {
    await new Promise((resolve, reject) => {
      this.web3WalletConnector.providerController.on(
        CONNECT_EVENT,
        (provider) => {
          resolve(provider);
        }
      );
    });
  }

  accountObservable(): Observable<string> {
    return this.account.asObservable();
  }
}
