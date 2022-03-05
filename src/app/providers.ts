import { ethers } from 'ethers';
import { Subject } from 'rxjs';

export interface IProvider {
  name: string;
  logo: string;
  onClick: () => Promise<void>;
}

export class MetaMask implements IProvider {
  name = 'MetaMask';
  logo = '/assets/MetaMask.svg';

  constructor(private subject: Subject<string>) {}

  async onClick() {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider.send('eth_requestAccounts', []);
    this.subject.next(this.name);
  };
};
