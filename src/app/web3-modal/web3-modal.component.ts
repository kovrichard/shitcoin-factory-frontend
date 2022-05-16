import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Web3ModalService } from './web3-modal.service';
import { IProvider } from '../providers';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  @Input() description?: string;

  @ViewChild('connectButton', { read: ElementRef })
  private connectButton!: ElementRef<HTMLElement>;

  constructor(
    private service: Web3ModalService,
    private breakpoints: BreakpointObserver
  ) {}

  async ngOnInit() {
    this.breakpoints
      .observe([
        Breakpoints.Large,
        Breakpoints.Medium,
        Breakpoints.Small,
        Breakpoints.XSmall,
      ])
      .subscribe((result: any) => {
        if (result.matches) {
          this.connectButton.nativeElement.classList.add('large-btn');
        } else {
          this.connectButton.nativeElement.classList.remove('large-btn');
        }
      });
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
