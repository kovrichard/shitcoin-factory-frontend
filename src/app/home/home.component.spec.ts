import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from '../navbar/navbar.component';
import { Web3ModalComponent } from '../web3-modal/web3-modal.component';
import { Web3ModalService } from '../web3-modal/web3-modal.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, NavbarComponent, Web3ModalComponent],
      providers: [Web3ModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain navbar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const modal = compiled.querySelector('app-navbar');
    expect(modal).toBeTruthy();
  });
});
