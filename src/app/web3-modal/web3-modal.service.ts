import { EventEmitter, Inject, Injectable, Optional } from '@angular/core';
import {
  CONNECT_EVENT,
  IProviderOptions,
  IProviderUserOptions,
  Web3WalletConnector,
} from '@mindsorg/web3modal-ts';
import Web3 from 'web3';

interface IProviderControllerOptions {
  disableInjectedProvider: boolean;
  cacheProvider: boolean;
  providerOptions: IProviderOptions;
  network: string;
}

@Injectable()
export class Web3ModalService {
  private web3WalletConnector: Web3WalletConnector;
  private account: string | null;

  public providers: EventEmitter<IProviderUserOptions[]> = new EventEmitter();
  public web3: Web3;

  constructor(
    @Inject('configOptions')
    @Optional()
    configOptions: IProviderControllerOptions
  ) {
    this.web3WalletConnector = new Web3WalletConnector(configOptions);
    this.web3 = new Web3();
    this.account = null;
  }

  loadProviders() {
    this.providers.next(this.web3WalletConnector.providers);
  }

  async open() {
    return await new Promise((resolve, reject) => {
      this.web3WalletConnector.providerController.on(
        CONNECT_EVENT,
        (provider) => {
          resolve(provider);
        }
      );
    });
  }

  async loadCachedProvider() {
    const cachedProvider =
      this.web3WalletConnector.providerController.cachedProvider;
    const provider =
      this.web3WalletConnector.providerController.getProvider(cachedProvider);
    return await provider?.connector();
  }
}
