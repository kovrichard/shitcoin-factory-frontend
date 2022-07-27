import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Web3ModalService } from './web3-modal.service';
import { IProvider } from '../providers';
import { Subscription } from 'rxjs';
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
  private chainSubscription: Subscription;

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
    this.chainSubscription = this.chain.valid.subscribe((valid: boolean) => {
      this.validChain = valid;
    });
  }

  ngOnDestroy() {
    this.providersSubscription.unsubscribe();
    this.accountSubscription.unsubscribe();
    this.chainSubscription.unsubscribe();
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
