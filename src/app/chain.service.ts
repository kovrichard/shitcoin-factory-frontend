import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EthersProvider } from './providers';

@Injectable({
  providedIn: 'root'
})
export class ChainService {
  networkUrl = '';
  explorer = '';
  contractAddress = '';
  id = new BehaviorSubject(0);

  constructor() {
    this.id.subscribe((id: number) => {
      if (id == 1337 || id == 97 || id == 56) {
        this.networkUrl = environment.bscNetworkUrl;
        this.explorer = environment.bscScan;
        this.contractAddress = environment.bscContractAddress;
      } else if (id == 3 || id == 1) {
        this.networkUrl = environment.etherNetworkUrl;
        this.explorer = environment.etherScan;
        this.contractAddress = environment.etherContractAddress;
      }
    });
  }
}
