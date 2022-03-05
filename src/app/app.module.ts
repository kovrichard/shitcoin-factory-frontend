import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Web3ModalModule } from './web3-modal/web3-modal.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Web3ModalService } from './web3-modal/web3-modal.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';

const providerOptions = {};

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Web3ModalModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
  ],
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
