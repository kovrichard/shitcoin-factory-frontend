import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { ShitcoinFactoryService } from '../shitcoin-factory.service';
import { Web3ModalComponent } from '../web3-modal/web3-modal.component';
import { Web3ModalService } from '../web3-modal/web3-modal.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: Web3ModalService;
  let shitcoinFactory: ShitcoinFactoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, NavbarComponent, Web3ModalComponent],
      providers: [Web3ModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    service = TestBed.inject(Web3ModalService);
    shitcoinFactory = TestBed.inject(ShitcoinFactoryService);
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

  it('should save the caller', fakeAsync(() => {
    spyOn(service, 'accountObservable').and.returnValue(of('test-account'));
    component.ngOnInit();
    tick();

    expect(component.caller).toEqual('test-account');
  }));
});
