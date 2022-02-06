import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Web3ModalComponent } from './web3-modal.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [Web3ModalComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [Web3ModalComponent],
})
export class Web3ModalModule {}
