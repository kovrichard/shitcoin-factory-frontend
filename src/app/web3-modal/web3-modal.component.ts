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

  private openSubscription: Subscription;
  private providersSubscription: Subscription;
  private readonly metamaskShopURL = 'https://metamask.io/download.html';

  @Input() buttonTitle: string;
  @Input() modalTitle: string;
  @Input() description?: string;
  @Input() dismissText?: string;
  @Input() promptMetamaskIfNotInstalled = false;

  constructor(private service: Web3ModalService) {}

  async ngOnInit() {
    this.openSubscription = this.service.shouldOpen.subscribe({
      next: (open: boolean) => {
        this.open = open;
      },
    });

    this.providersSubscription = this.service.providers.subscribe({
      next: (providers: IProviderUserOptions[]) => {
        this.showMetamaskDownload =
          this.promptMetamaskIfNotInstalled &&
          !this.isMetamaskInProviders(providers);
        this.providers = providers;
      },
    });

    this.service.loadProviders();
  }

  ngOnDestroy(): void {
    this.openSubscription.unsubscribe();
    this.providersSubscription.unsubscribe();
  }

  async connect() {
    const provider = await this.service.open();
    this.service.web3.setProvider(provider as provider);
  }

  close(event: any) {
    this.service.close();
    event.stopPropagation();
  }

  private isMetamaskInProviders(providers: IProviderUserOptions[]): boolean {
    return providers.some((p) => p.name.toLowerCase() === 'metamask');
  }

  openMetamaskDownloadPage(): void {
    window.open(this.metamaskShopURL, '_blank');
  }
}
