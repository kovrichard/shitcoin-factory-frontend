import { Subject } from 'rxjs';
import { IProvider } from './providers';
import { MetaMask } from './providers';

export class ProviderController {
  providers: IProvider[] = [];
  connected = new Subject<string>();

  constructor(controllerOptions: string[]) {
    if (controllerOptions.includes('metamask')) {
      this.providers.push(new MetaMask(this.connected));
    }
  }
}
