import { Component, OnInit } from '@angular/core';
import { Web3ModalService } from '../web3-modal/web3-modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private web3modalService: Web3ModalService) {}

  ngOnInit(): void {}

  async connect() {
    const provider = await this.web3modalService.open();
  }
}
