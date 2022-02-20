import { Injectable } from '@angular/core';
import {Web3ModalService} from './web3-modal/web3-modal.service';
import abi from './web3-modal/factory-abi.json';
import { AbiItem } from 'web3-utils';

@Injectable({
  providedIn: 'root'
})
export class ShitcoinFactoryService {
  factoryAbi = abi as AbiItem[];
  contractAddress = '0xfa448a6573D5c090FB353FE686a33EC93BdDaa3C';
  factory = new this.web3service.web3.eth.Contract(this.factoryAbi, this.contractAddress);

  constructor(private web3service: Web3ModalService) {}

  async numberOfCoins() {
    return await this.factory.methods.numberOfCoins().call();
  }

  async create(name: string, ticker: string, totalSupply: number) {
    await this.factory.methods.create(name, ticker, totalSupply).send({from: this.web3service.account});
  }

  async getShitcoin(index: number) {
    return await this.factory.methods.getShitcoin(index).call();
  }
}
