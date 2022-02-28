import { Injectable } from '@angular/core';
import { Web3ModalService } from './web3-modal/web3-modal.service';
import factoryAbi from './web3-modal/factory-abi.json';
import shitcoinAbi from './web3-modal/shitcoin.json';
import { AbiItem } from 'web3-utils';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContractInterface, ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class ShitcoinFactoryService {
  factoryAbi = factoryAbi as ContractInterface;
  shitcoinAbi = shitcoinAbi as ContractInterface;
  contractAddress = environment.contractAddress;
  factory: any;
  private numberOfCoins = new Subject<number>();

  constructor(private web3service: Web3ModalService) {
    this.web3service.s.asObservable().subscribe((signer: ethers.Signer) => {
      if (!signer) return;
      this.factory = new ethers.Contract(this.contractAddress, this.factoryAbi, signer)
      this.factory.numberOfCoins()
        .then((value: number) => {
          this.numberOfCoins.next(value);
        });
    });

  }

  numberOfCoinsObservable() {
    return this.numberOfCoins.asObservable();
  }

  create(name: string, ticker: string, totalSupply: number) {
    this.web3service.accountObservable().subscribe((account: string) => {
      if (account == '') {
        return;
      }

      this.factory
        .create(name, ticker, totalSupply, { from: account})
    });
  }

  async getShitcoin(index: number) {
    return await this.factory.getShitcoin(index);
  }

  async getShitcoinName(address: string) {
    const shitcoin = new ethers.Contract(
      address,
      this.shitcoinAbi,
      this.web3service.p
    );
    return await shitcoin.name();
  }

  async getShitcoinSymbol(address: string) {
    const shitcoin = new ethers.Contract(
      address,
      this.shitcoinAbi,
      this.web3service.p
    );
    return await shitcoin.symbol();
  }

  async getShitcoinTotalSupply(address: string) {
    const shitcoin = new ethers.Contract(
      address,
      this.shitcoinAbi,
      this.web3service.p
    );
    return await shitcoin.totalSupply();
  }

  async getShitcoinOwner(address: string) {
    const shitcoin = new ethers.Contract(
      address,
      this.shitcoinAbi,
      this.web3service.p
    );
    return await shitcoin.owner();
  }
}
