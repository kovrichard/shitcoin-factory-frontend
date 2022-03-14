import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'shadow-card',
  templateUrl: './shadow-card.component.html',
  styleUrls: ['./shadow-card.component.scss']
})
export class ShadowCardComponent implements  AfterViewInit {
  @ViewChild('shadowCard') private div!: ElementRef<HTMLDivElement>;
  @Input() color = 'accent';
  @Input() width = '';
  @Input() height = '';
  @Input() text = '';
  @Input() icon = '';

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.el.nativeElement.style.display = 'flex';
    this.el.nativeElement.style.padding = '1rem';
    this.el.nativeElement.style.width = this.width;
    this.div.nativeElement.style.height = this.height;
  }

}
