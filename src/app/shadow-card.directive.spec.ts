import { ShadowCardDirective } from './shadow-card.directive';
import { ElementRef } from '@angular/core';

describe('ShadowCardDirective', () => {
  const nativeElement = document.createElement('div');
  const elementRef = new ElementRef(nativeElement);

  it('should set instance style', () => {
    const directive = new ShadowCardDirective(elementRef);

    expect(nativeElement.style.borderRadius).toEqual('1rem');
    expect(nativeElement.style.boxShadow).toEqual('rgb(0, 0, 0) 3px 6px 8px');
    expect(nativeElement.style.textAlign).toEqual('center');
  });
});
