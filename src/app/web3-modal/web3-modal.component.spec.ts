import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    expect(component.hidden).toBeTrue();
    expect(component.providers).toEqual([]);
    expect(component.promptMetamaskIfNotInstalled).toBeFalse();
  });

  it('close should close service', () => {
    const closeMock = spyOn(service, 'close');
    component.close(new Event('Mock'));
    expect(closeMock).toHaveBeenCalledOnceWith();
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
});
