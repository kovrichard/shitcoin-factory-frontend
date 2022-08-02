import { Injectable } from '@angular/core';
import { Web3ModalService } from './web3-modal/web3-modal.service';
import factoryAbi from './web3-modal/factory-abi.json';
import shitcoinAbi from './web3-modal/shitcoin.json';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ContractInterface, ethers } from 'ethers';
import { ChainService } from './chain.service';

@Injectable({
  providedIn: 'root',
})
export class ShitcoinFactoryService {
  factoryAbi = factoryAbi as ContractInterface;
  shitcoinAbi = shitcoinAbi as ContractInterface;
  factory: ethers.Contract;
  numberOfCoins = new BehaviorSubject(0);
  costContract: ethers.Contract;
  cost: bigint;
  payable = new BehaviorSubject(false);

  constructor(
    private web3service: Web3ModalService,
    private chain: ChainService
  ) {
    const chainData = combineLatest({
      address: this.chain.contractAddress,
      signer: this.web3service.signer,
    });

    chainData.subscribe((data: any) => {
      this.factory = new ethers.Contract(
        data.address,
        this.factoryAbi,
        data.signer
      );
      this.factory.numberOfCoins().then((value: number) => {
        this.numberOfCoins.next(value);
      });

      const costAddress = this.factory.costAddress();
      const cost = this.factory.getCost();
      Promise.all([costAddress, cost]).then((values: any) => {
        this.costContract = new ethers.Contract(
          values[0],
          shitcoinAbi as ContractInterface,
          data.signer
        );
        this.cost = values[1];
        this.checkAllowance();
      });
    });
  }

  create(name: string, ticker: string, totalSupply: number) {
    const account = this.web3service.account.value;
    if (account == '') return;

    this.factory.create(name, ticker, totalSupply, { from: account });
  }

  approve() {
    this.costContract
      .approve(this.chain.contractAddress.value, this.cost)
      .then((result: any) => {
        result.wait().then(() => {
          this.checkAllowance();
        });
      });
  }

  getShitcoin(index: number): Promise<string> {
    return this.factory.getShitcoin(index).then(async (address: string) => {
      const shitcoin = new ethers.Contract(
        address,
        this.shitcoinAbi,
        this.web3service.provider
      );
      return {
        address: address,
        name: '', //await shitcoin.callStatic.name(),
        symbol: await shitcoin.callStatic.symbol(),
        totalSupply: 0, //await shitcoin.callStatic.totalSupply(),
        owner: '', //await shitcoin.callStatic.owner(),
      };
    });
  }

  private checkAllowance() {
    this.costContract
      .allowance(
        this.web3service.account.value,
        this.chain.contractAddress.value
      )
      .then((amount: any) => {
        this.payable.next(amount >= this.cost);
      });
  }
}
