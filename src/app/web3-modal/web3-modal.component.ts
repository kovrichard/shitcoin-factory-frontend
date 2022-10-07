import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Web3ModalService } from './web3-modal.service';
import { IProvider } from '../providers';
import { Observable, Subscription } from 'rxjs';
import { ChainService } from '../chain.service';

@Component({
  selector: 'm-web3-modal',
  templateUrl: './web3-modal.component.html',
  styleUrls: ['./web3-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Web3ModalComponent implements OnInit, OnDestroy {
  private providersSubscription: Subscription;
  private accountSubscription: Subscription;

  validChain$: Observable<boolean>;
  logo$: Observable<string>;
  open = false;
  account = '';
  providers: IProvider[];
  validChain = true;

  @Input() buttonTitle: string;
  @Input() description?: string;

  constructor(private service: Web3ModalService, private chain: ChainService) {}

  ngOnInit() {
    this.providersSubscription = this.service.providers.subscribe({
      next: (providers: IProvider[]) => {
        this.providers = providers;
      },
    });
    this.accountSubscription = this.service.account.subscribe(
      (account: string) => {
        this.account = account;
      }
    );
    this.validChain$ = this.chain.valid;
    this.logo$ = this.chain.logo;
  }

  ngOnDestroy() {
    this.providersSubscription.unsubscribe();
    this.accountSubscription.unsubscribe();
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
