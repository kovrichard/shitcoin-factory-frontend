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

@Component({
  selector: 'm-web3-modal',
  templateUrl: './web3-modal.component.html',
  styleUrls: ['./web3-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Web3ModalComponent implements OnInit, OnDestroy {
  private providersSubscription: Subscription;
  private accountSubscription: Subscription;

  open = false;
  account = '';
  providers: IProvider[];

  @Input() buttonTitle: string;
  @Input() description?: string;

  constructor(private service: Web3ModalService) {}

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
  }

  ngOnDestroy() {
    this.providersSubscription.unsubscribe();
    this.accountSubscription.unsubscribe();
  }

  async connect() {
    this.open = true;
    await this.service.open();
    window.localStorage.setItem('state', 'connected');
    this.open = false;
  }

  close(event: any) {
    this.open = false;
    event.stopPropagation();
  }
}
