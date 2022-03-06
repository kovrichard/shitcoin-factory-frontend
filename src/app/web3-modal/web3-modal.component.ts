import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Web3ModalService } from './web3-modal.service';
import { IProvider } from '../providers';

@Component({
  selector: 'm-web3-modal',
  templateUrl: './web3-modal.component.html',
  styleUrls: ['./web3-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Web3ModalComponent implements OnInit {
  open = false;
  showMetamaskDownload: boolean;
  account = '';
  providers: IProvider[];

  @Input() buttonTitle: string;
  @Input() modalTitle: string;
  @Input() description?: string;
  @Input() dismissText?: string;
  @Input() promptMetamaskIfNotInstalled = false;

  constructor(private service: Web3ModalService) {}

  async ngOnInit() {
    this.service.providers.subscribe({
      next: (providers: IProvider[]) => {
        this.providers = providers;
      },
    });
    this.service.account.subscribe((account: string) => {
      this.account = account;
    });
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
}
