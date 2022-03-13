import { Input, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[shadowCard]'
})
export class ShadowCardDirective {
  bodyStyle = window.getComputedStyle(document.body);
  c = this.bodyStyle.getPropertyValue("$light-primary");
  @Input() color = this.c;

  constructor(private el: ElementRef) {
    let elementStyle = this.el.nativeElement.style;
    elementStyle.borderRadius = '1rem';
    elementStyle.boxShadow = '3px 6px 8px #000000';
    elementStyle.textAlign = 'center';
    elementStyle.backgroundColor = this.color;
  }
}
