import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Web3ModalComponent } from './web3-modal.component';
import { Web3ModalMetamaskLogoComponent } from './web3-modal-metamask-logo.component';

@NgModule({
  declarations: [Web3ModalComponent, Web3ModalMetamaskLogoComponent],
  imports: [CommonModule],
  exports: [Web3ModalComponent],
})
export class Web3ModalModule {}
