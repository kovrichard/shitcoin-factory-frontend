import { Injectable } from '@angular/core';
import { Web3ModalService } from './web3-modal/web3-modal.service';
import factoryAbi from './web3-modal/factory-abi.json';
import shitcoinAbi from './web3-modal/shitcoin.json';
import { AbiItem } from 'web3-utils';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShitcoinFactoryService {
  factoryAbi = factoryAbi as AbiItem[];
  shitcoinAbi = shitcoinAbi as AbiItem[];
  contractAddress = environment.contractAddress;
  factory = new this.web3service.web3.eth.Contract(
    this.factoryAbi,
    this.contractAddress
  );
  private numberOfCoins = new Subject<number>();

  constructor(private web3service: Web3ModalService) {
    this.web3service.providerSet.subscribe((set: boolean) => {
      this.factory.methods
        .numberOfCoins()
        .call()
        .then((value: number) => {
          this.numberOfCoins.next(value);
        });
    });
  }

  numberOfCoinsObservable() {
    return this.numberOfCoins.asObservable();
  }

  create(name: string, ticker: string, totalSupply: number) {
    this.factory.methods
      .create(name, ticker, totalSupply)
      .send({ from: this.web3service.account });
  }

  async getShitcoin(index: number) {
    return await this.factory.methods.getShitcoin(index).call();
  }

  async getShitcoinName(address: string) {
    const shitcoin = new this.web3service.web3.eth.Contract(
      this.shitcoinAbi,
      address
    );
    return await shitcoin.methods.name().call();
  }

  async getShitcoinSymbol(address: string) {
    const shitcoin = new this.web3service.web3.eth.Contract(
      this.shitcoinAbi,
      address
    )
    return await shitcoin.methods.symbol().call();  
  }

  async getShitcoinTotalSupply(address: string) {
    const shitcoin = new this.web3service.web3.eth.Contract(
      this.shitcoinAbi,
      address
    )
    return await shitcoin.methods.totalSupply().call();
  }
}
