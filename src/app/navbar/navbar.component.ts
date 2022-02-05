import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { Web3ModalService } from '../web3-modal/web3-modal.service';
import { provider } from 'web3-core';
import abi from '../web3-modal/factory-abi.json';
import { AbiItem } from 'web3-utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private web3: Web3;
  connected: boolean;
  account: string | null;
  factoryAbi: AbiItem[];
  contractAddress: string;

  constructor(private web3modalService: Web3ModalService) {
    this.web3 = new Web3();
    this.account = '';
    this.factoryAbi = abi as AbiItem[];
  }

  ngOnInit() {}

  async connect() {
    const provider = await this.web3modalService.open();
    this.web3.setProvider(provider as provider);
  }
}
