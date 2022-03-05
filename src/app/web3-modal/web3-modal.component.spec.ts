import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Web3ModalComponent } from './web3-modal.component';
import { Web3ModalService } from './web3-modal.service';
import { fakeWeb3ModalService } from '../home/home.component.spec';

describe('Web3ModalComponent', () => {
  let component: Web3ModalComponent;
  let fixture: ComponentFixture<Web3ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Web3ModalComponent],
      providers: [
        {
          provide: Web3ModalService,
          useValue: fakeWeb3ModalService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Web3ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set default parameters', () => {
    expect(component.open).toBeFalse();
  });

  it('should get providers from service', fakeAsync(() => {
    expect(component.ps[0].name).toEqual('test-provider');
    expect(component.ps[0].logo).toEqual('test-logo');
  }));

  it('should get account from service', fakeAsync(() => {
    expect(component.account).toEqual('test-account');
  }));

  it('connect should set open to false', fakeAsync(() => {
    component.connect();
    tick();

    expect(component.open).toBeFalse();
  }));

  it('close should set open to false', () => {
    component.open = true;
    expect(component.open).toBeTrue();

    component.close(new Event('test-event'));
    expect(component.open).toBeFalse();
  });

  it('close should stop event propagation', () => {
    const eventMock = new Event('Mock');
    const stopMock = spyOn(eventMock, 'stopPropagation');
    component.close(eventMock);
    expect(stopMock).toHaveBeenCalledOnceWith();
  });
});
