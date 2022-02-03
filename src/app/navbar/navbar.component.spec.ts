import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Web3ModalService } from '../web3-modal/web3-modal.service';
import { Web3ModalComponent } from '../web3-modal/web3-modal.component';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent, Web3ModalComponent],
      providers: [Web3ModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain web3modal', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const modal = compiled.querySelector('m-web3-modal');
    expect(modal).toBeTruthy();
  });
});
