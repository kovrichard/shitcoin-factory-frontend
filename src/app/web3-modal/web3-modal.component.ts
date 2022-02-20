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
import { provider } from 'web3-core';

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
  provider: provider;
  account: string | null = null;

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
    this.provider = await this.service.loadCachedProvider();

    if (this.provider) {
      this.service.web3.setProvider(this.provider);
      const accounts = await this.service.web3.eth.getAccounts();
      this.account = accounts[0];
    }
  }

  ngOnDestroy(): void {
    this.providersSubscription.unsubscribe();
  }

  async connect() {
    this.open = true;
    const provider = this.provider ? this.provider : await this.service.open();
    this.service.web3.setProvider(provider as provider);
    const accounts = await this.service.web3.eth.getAccounts();
    this.account = accounts[0];
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
