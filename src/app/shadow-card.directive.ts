import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[shadowCard]',
})
export class ShadowCardDirective implements OnInit {
  private bodyStyle = window.getComputedStyle(document.body);
  private c = this.bodyStyle.getPropertyValue('$light-primary');
  @Input() color = this.c;
  @Input() width = '';
  @Input() height = '';

  constructor(private el: ElementRef) {}
  
  ngOnInit() {
    const elementStyle = this.el.nativeElement.style;
    elementStyle.display = 'inline-flex';
    elementStyle.flexDirection = 'column';
    elementStyle.alignItems = 'center';
    elementStyle.justifyContent = 'center';
    elementStyle.borderRadius = '1rem';
    elementStyle.boxShadow = '3px 6px 8px #000000';
    elementStyle.textAlign = 'center';
    elementStyle.backgroundColor = this.color;
    elementStyle.width = this.width;
    elementStyle.height = this.height;
  }
}
