import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'shadow-card',
  templateUrl: './shadow-card.component.html',
  styleUrls: ['./shadow-card.component.scss']
})
export class ShadowCardComponent implements  AfterViewInit {
  private bodyStyle = window.getComputedStyle(document.body);
  private defaultColor = this.bodyStyle.getPropertyValue('$light-primary');
  @ViewChild('shadowCard') div!: ElementRef<HTMLDivElement>;
  @Input() color = this.defaultColor;
  @Input() width = '';
  @Input() height = '';
  @Input() text = '';
  @Input() icon = '';

  constructor() { }

  ngAfterViewInit(): void {
    this.div.nativeElement.style.width = this.width;
    this.div.nativeElement.style.height = this.height;
    this.div.nativeElement.style.backgroundColor = this.color;
  }

}
