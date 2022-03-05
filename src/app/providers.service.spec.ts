import { TestBed } from '@angular/core/testing';

import { ProviderController } from './providers.service';

describe('ProvidersController', () => {
  let service: ProviderController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
