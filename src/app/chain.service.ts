import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChainService {
  networkUrl = new BehaviorSubject(environment.etherNetworkUrl);
  private _explorer = new BehaviorSubject(environment.etherScan);
  readonly explorer = this._explorer.asObservable();
  contractAddress = new BehaviorSubject(environment.etherContractAddress);
  id = new BehaviorSubject(56);

  private _valid = new BehaviorSubject(true);
  readonly valid = this._valid.asObservable();

  private _logo = new BehaviorSubject('bnb-logo.svg');
  readonly logo = this._logo.asObservable();

  constructor() {
    this.id.subscribe((id: number) => {
      if (!this.validChain(id)) return;

      if (id == 97 || id == 56) {
        this.networkUrl.next(environment.bscNetworkUrl);
        this._explorer.next(environment.bscScan);
        this.contractAddress.next(environment.bscContractAddress);
        this._logo.next('bnb-logo.svg');
      } else if (id == 1337 || id == 11155111 || id == 1) {
        this.networkUrl.next(environment.etherNetworkUrl);
        this._explorer.next(environment.etherScan);
        this.contractAddress.next(environment.etherContractAddress);
        this._logo.next('ethereum-logo.svg');
      } else if (id == 137 || id == 80001) {
        this.networkUrl.next(environment.polygonNetworkUrl);
        this._explorer.next(environment.polygonScan);
        this.contractAddress.next(environment.polygonContractAddress);
        this._logo.next('polygon-logo.svg');
      } else if (id == 43113 || id == 43114) {
        this.networkUrl.next(environment.avaxNetworkUrl);
        this._explorer.next(environment.snowTrace);
        this.contractAddress.next(environment.avaxContractAddress);
        this._logo.next('avax-logo.svg');
      }
    });
  }

  private validChain(id: number) {
    this._valid.next(environment.validChains.includes(id));
    return this._valid.value;
  }
}
