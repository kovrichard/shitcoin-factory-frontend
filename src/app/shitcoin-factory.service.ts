import { Injectable } from '@angular/core';
import { Web3ModalService } from './web3-modal/web3-modal.service';
import factoryAbi from './web3-modal/factory-abi.json';
import shitcoinAbi from './web3-modal/shitcoin.json';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ContractInterface, ethers } from 'ethers';
import { ChainService } from './chain.service';

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

@Injectable({
  providedIn: 'root',
})
export class ShitcoinFactoryService {
  factoryAbi = factoryAbi as ContractInterface;
  shitcoinAbi = shitcoinAbi as ContractInterface;
  factory: ethers.Contract;
  numberOfCoins = new BehaviorSubject(0);
  costContract: ethers.Contract;
  private _cost = new BehaviorSubject(BigInt(0));
  readonly cost$ = this._cost.asObservable();
  private _costDecimals = new BehaviorSubject(18);
  readonly costDecimals$ = this._costDecimals.asObservable();
  private _costCoin = new BehaviorSubject('');
  readonly costCoin$ = this._costCoin.asObservable();
  private _payable = new BehaviorSubject(false);
  readonly payable$ = this._payable.asObservable();

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
        this._cost.next(values[1]);
        if (values[0] == NULL_ADDRESS) {
          this._payable.next(true);
          return;
        }

        this.costContract = new ethers.Contract(
          values[0],
          shitcoinAbi as ContractInterface,
          data.signer
        );
        this.costContract.symbol().then((symbol: string) => {
          this._costCoin.next(symbol);
        });
        this.costContract.decimals().then((decimals: number) => {
          this._costDecimals.next(decimals);
        });
        this.checkAllowance();
      });
    });
  }

  create(name: string, ticker: string, totalSupply: number) {
    const account = this.web3service.account.value;
    if (account == '') return;

    this.factory.create(name, ticker, totalSupply, {
      from: account,
      gasLimit: 21000,
    });
  }

  approve() {
    this.costContract
      .approve(this.chain.contractAddress.value, this._cost.value)
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
        this._payable.next(amount >= this._cost.value);
      });
  }
}
