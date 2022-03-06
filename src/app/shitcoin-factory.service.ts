import { Injectable } from '@angular/core';
import { Web3ModalService } from './web3-modal/web3-modal.service';
import factoryAbi from './web3-modal/factory-abi.json';
import shitcoinAbi from './web3-modal/shitcoin.json';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContractInterface, ethers } from 'ethers';
import { EthersProvider } from './providers';

@Injectable({
  providedIn: 'root',
})
export class ShitcoinFactoryService {
  factoryAbi = factoryAbi as ContractInterface;
  shitcoinAbi = shitcoinAbi as ContractInterface;
  contractAddress = environment.contractAddress;
  factory: ethers.Contract;
  numberOfCoins = new BehaviorSubject(0);

  constructor(private web3service: Web3ModalService) {
    this.web3service.signer.subscribe(
      (signer: ethers.providers.JsonRpcSigner | EthersProvider) => {
        if (!signer) return;
        this.factory = new ethers.Contract(
          this.contractAddress,
          this.factoryAbi,
          signer
        );
        this.factory.numberOfCoins().then((value: number) => {
          this.numberOfCoins.next(value);
        });
      }
    );
  }

  create(name: string, ticker: string, totalSupply: number) {
    this.web3service.account.subscribe((account: string) => {
      if (account == '') {
        return;
      }

      this.factory.create(name, ticker, totalSupply, { from: account });
    });
  }

  async getShitcoin(index: number): Promise<string> {
    return await this.factory.callStatic.getShitcoin(index);
  }

  async getShitcoinName(address: string) {
    const shitcoin = new ethers.Contract(
      address,
      this.shitcoinAbi,
      this.web3service.provider
    );
    return await shitcoin.callStatic.name();
  }

  async getShitcoinSymbol(address: string) {
    const shitcoin = new ethers.Contract(
      address,
      this.shitcoinAbi,
      this.web3service.provider
    );
    return await shitcoin.callStatic.symbol();
  }

  async getShitcoinTotalSupply(address: string) {
    const shitcoin = new ethers.Contract(
      address,
      this.shitcoinAbi,
      this.web3service.provider
    );
    return await shitcoin.callStatic.totalSupply();
  }

  async getShitcoinOwner(address: string) {
    const shitcoin = new ethers.Contract(
      address,
      this.shitcoinAbi,
      this.web3service.provider
    );
    return await shitcoin.callStatic.owner();
  }
}
