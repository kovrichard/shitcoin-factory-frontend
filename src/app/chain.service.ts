import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChainService {
  networkUrl = new BehaviorSubject(environment.etherNetworkUrl);
  explorer = new BehaviorSubject(environment.etherScan);
  contractAddress = new BehaviorSubject(environment.etherContractAddress);
  id = new BehaviorSubject(1);
  valid = new BehaviorSubject(true);

  constructor() {
    this.id.subscribe((id: number) => {
      if (!this.validChain(id)) return;

      if (id == 97 || id == 56) {
        this.networkUrl.next(environment.bscNetworkUrl);
        this.explorer.next(environment.bscScan);
        this.contractAddress.next(environment.bscContractAddress);
      } else if (id == 1337 || id == 3) {
        this.networkUrl.next(environment.etherNetworkUrl);
        this.explorer.next(environment.etherScan);
        this.contractAddress.next(environment.etherContractAddress);
      } else if (id == 137 || id == 80001) {
        this.networkUrl.next(environment.polygonNetworkUrl);
        this.explorer.next(environment.polygonScan);
        this.contractAddress.next(environment.polygonContractAddress);
      }
    });
  }

  private validChain(id: number) {
    this.valid.next(environment.validChains.includes(id));
    return this.valid.value;
  }
}
