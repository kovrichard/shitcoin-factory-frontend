import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProviderController } from './providers.service';

describe('ProvidersController', () => {
  let service: ProviderController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
    }).compileComponents();
  });

  it('should set default values', () => {
    service = new ProviderController([]);
    expect(service.providers).toEqual([]);
  });

  it('should add metamask provider', () => {
    service = new ProviderController(['metamask']);
    expect(service.providers[0].name).toEqual('MetaMask');
    expect(service.providers[0].logo).toEqual('/assets/MetaMask.svg');
  });
});
