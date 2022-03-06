import { ethers } from 'ethers';
import { Subject } from 'rxjs';

export type EthersProvider =
  | ethers.providers.Web3Provider
  | ethers.providers.JsonRpcProvider;

export interface IProvider {
  name: string;
  logo: string;
  onClick: () => Promise<void>;
}

export class MetaMask implements IProvider {
  name = 'MetaMask';
  logo = '/assets/MetaMask.svg';

  constructor(private subject: Subject<EthersProvider>) {}

  async onClick() {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider.send('eth_requestAccounts', []);
    this.subject.next(provider);
  }
}
