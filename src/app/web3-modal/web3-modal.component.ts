import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
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
  ps: IProvider[];

  @Input() buttonTitle: string;
  @Input() modalTitle: string;
  @Input() description?: string;
  @Input() dismissText?: string;
  @Input() promptMetamaskIfNotInstalled = false;

  constructor(private service: Web3ModalService) {}

  async ngOnInit() {
    this.service.loadProviders();
    this.service.ps.subscribe({
      next: (providers: IProvider[]) => {
        this.ps = providers;
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
