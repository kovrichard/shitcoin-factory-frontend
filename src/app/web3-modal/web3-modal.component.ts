import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IProviderUserOptions } from '@mindsorg/web3modal-ts';
import { Web3ModalService } from './web3-modal.service';

@Component({
  selector: 'm-web3-modal',
  templateUrl: './web3-modal.component.html',
  styleUrls: ['./web3-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Web3ModalComponent implements OnInit, OnDestroy {
  open = false;
  providers: IProviderUserOptions[] = [];
  showMetamaskDownload: boolean;
  account = '';

  private providersSubscription: Subscription;
  private readonly metamaskShopURL = 'https://metamask.io/download.html';

  @Input() buttonTitle: string;
  @Input() modalTitle: string;
  @Input() description?: string;
  @Input() dismissText?: string;
  @Input() promptMetamaskIfNotInstalled = false;

  constructor(private service: Web3ModalService) {}

  async ngOnInit() {
    this.providersSubscription = this.service.providers.subscribe({
      next: (providers: IProviderUserOptions[]) => {
        this.showMetamaskDownload =
          this.promptMetamaskIfNotInstalled &&
          !this.isMetamaskInProviders(providers);
        this.providers = providers;
      },
    });

    this.service.loadProviders();
    await this.service.loadCachedProvider();

    this.service.accountObservable().subscribe((account) => {
      this.account = account;
    });
  }

  ngOnDestroy(): void {
    this.providersSubscription.unsubscribe();
  }

  async connect() {
    this.open = true;
    await this.service.open();
    this.open = false;
  }

  close(event: any) {
    this.open = false;
    event.stopPropagation();
  }

  private isMetamaskInProviders(providers: IProviderUserOptions[]): boolean {
    return providers.some((p) => p.name.toLowerCase() === 'metamask');
  }

  openMetamaskDownloadPage(): void {
    window.open(this.metamaskShopURL, '_blank');
  }
}
