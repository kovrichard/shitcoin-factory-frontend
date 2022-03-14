import { ShadowCardDirective } from './shadow-card.directive';
import { ElementRef } from '@angular/core';

describe('ShadowCardDirective', () => {
  const nativeElement = document.createElement('div');
  const elementRef = new ElementRef(nativeElement);

  it('should set instance style', () => {
    const directive = new ShadowCardDirective(elementRef);
    directive.ngOnInit();

    expect(nativeElement.style.display).toEqual('inline-flex');
    expect(nativeElement.style.flexDirection).toEqual('column');
    expect(nativeElement.style.alignItems).toEqual('center');
    expect(nativeElement.style.justifyContent).toEqual('center');
    expect(nativeElement.style.borderRadius).toEqual('1rem');
    expect(nativeElement.style.boxShadow).toEqual('rgb(0, 0, 0) 3px 6px 8px');
    expect(nativeElement.style.textAlign).toEqual('center');
    expect(nativeElement.style.backgroundColor).toEqual('');
    expect(nativeElement.style.width).toEqual('');
    expect(nativeElement.style.height).toEqual('');
  });

  it('should use input values', () => {
    const directive = new ShadowCardDirective(elementRef);
    directive.color = 'black';
    directive.width = '100px';
    directive.height = '100px';
    directive.ngOnInit();

    expect(nativeElement.style.backgroundColor).toEqual('black');
    expect(nativeElement.style.width).toEqual('100px');
    expect(nativeElement.style.height).toEqual('100px');
  });
});
