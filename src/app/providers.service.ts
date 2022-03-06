import { ethers } from 'ethers';
import { Subject } from 'rxjs';
import { EthersProvider, IProvider } from './providers';
import { MetaMask } from './providers';

export class ProviderController {
  providers: IProvider[] = [];
  chosenProvider = new Subject<EthersProvider>();

  constructor(controllerOptions: string[]) {
    if (controllerOptions.includes('metamask')) {
      this.providers.push(new MetaMask(this.chosenProvider));
    }
  }
}
