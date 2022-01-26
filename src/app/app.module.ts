import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Web3ModalModule } from './web3-modal/web3-modal.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Web3ModalService } from './web3-modal/web3-modal.service';

const providerOptions = {};

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, Web3ModalModule],
  providers: [
    {
      provide: Web3ModalService,
      useFactory: () => {
        return new Web3ModalService({
          network: 'mainnet',
          cacheProvider: true,
          disableInjectedProvider: false,
          providerOptions,
        });
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
