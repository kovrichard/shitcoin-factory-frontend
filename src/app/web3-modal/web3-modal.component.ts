import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Web3ModalService } from './web3-modal.service';
import { IProvider } from '../providers';
import { Observable } from 'rxjs';
import { ChainService } from '../chain.service';

@Component({
  selector: 'm-web3-modal',
  templateUrl: './web3-modal.component.html',
  styleUrls: ['./web3-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Web3ModalComponent implements OnInit {
  providers$: Observable<IProvider[]>;
  account$: Observable<string>;
  validChain$: Observable<boolean>;
  logo$: Observable<string>;

  open = false;

  @Input() buttonTitle: string;
  @Input() description?: string;

  constructor(private service: Web3ModalService, private chain: ChainService) {}

  ngOnInit() {
    this.providers$ = this.service.providers$;
    this.account$ = this.service.account$;
    this.validChain$ = this.chain.valid;
    this.logo$ = this.chain.logo;
  }

  connect() {
    this.open = true;
    this.service.open().then(() => {
      window.localStorage.setItem('state', 'connected');
      this.open = false;
    });
  }

  close(event: any) {
    this.open = false;
    event.stopPropagation();
  }
}
