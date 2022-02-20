import { EventEmitter, Inject, Injectable, Optional } from '@angular/core';
import {
  CONNECT_EVENT,
  IProviderOptions,
  IProviderUserOptions,
  Web3WalletConnector,
} from '@mindsorg/web3modal-ts';
import Web3 from 'web3';
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
  public web3 = new Web3();
  provider: provider;
  account: string | null = null;

  constructor(
    @Inject('configOptions')
    @Optional()
    configOptions: IProviderControllerOptions
  ) {
    this.web3WalletConnector = new Web3WalletConnector(configOptions);
  }

  loadProviders() {
    this.providers.next(this.web3WalletConnector.providers);
  }

  async open() {
    if (this.provider) return;

    this.provider = await new Promise((resolve, reject) => {
      this.web3WalletConnector.providerController.on(
        CONNECT_EVENT,
        (provider) => {
          resolve(provider);
        }
      );
    });

    this.web3.setProvider(this.provider);
    const accounts = await this.web3.eth.getAccounts();
    this.account = accounts[0];
  }

  async loadCachedProvider() {
    const cachedProvider =
      this.web3WalletConnector.providerController.cachedProvider;
    const provider =
      this.web3WalletConnector.providerController.getProvider(cachedProvider);
    
    this.provider = await provider?.connector();

    if (this.provider) {
      this.web3.setProvider(this.provider);
      const accounts = await this.web3.eth.getAccounts();
      this.account = accounts[0];
    }
  }
}
