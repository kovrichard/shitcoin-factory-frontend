import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { Web3ModalComponent } from './web3-modal.component';
import { Web3ModalService } from './web3-modal.service';

describe('Web3ModalComponent', () => {
  let component: Web3ModalComponent;
  let fixture: ComponentFixture<Web3ModalComponent>;
  let service: Web3ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Web3ModalComponent],
      providers: [Web3ModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Web3ModalComponent);
    service = TestBed.inject(Web3ModalService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default parameters', () => {
    expect(component.open).toBeFalse();
    expect(component.providers).toEqual([]);
    expect(component.promptMetamaskIfNotInstalled).toBeFalse();
  });

  it('ngOnInit should try to load cached provider', fakeAsync(() => {
    const cachedProviderMock = spyOn(service, 'loadCachedProvider');
    component.ngOnInit();
    tick();

    expect(cachedProviderMock).toHaveBeenCalledOnceWith();
  }));

  xit('connect should set open to false', fakeAsync(() => {
    component.connect();
    tick();

    expect(component.open).toBeFalse();
  }));

  it('connect should call service open', fakeAsync(() => {
    const openMock = spyOn(service, 'open');
    component.connect();
    tick();

    expect(openMock).toHaveBeenCalledOnceWith();
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

  it('open metamask download page should work', () => {
    const openMock = spyOn(window, 'open');
    component.openMetamaskDownloadPage();

    expect(openMock).toHaveBeenCalledOnceWith(
      'https://metamask.io/download.html',
      '_blank'
    );
  });

  it('account should return service account', fakeAsync(() => {
    spyOn(service, 'accountObservable').and.returnValue(of('test-account'));
    component.ngOnInit();
    tick();

    expect(component.account).toEqual('test-account');
  }));
});
