import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'circle',
  styleUrls: ['./circle.component.scss'],
  template: '<div #circle class="circle"><ng-content></ng-content></div>',
})
export class CircleComponent implements OnInit, AfterViewInit {
  @Input() width = '';
  @Input() height = '';
  @Input() margin = '';
  @Input() bgColor = '';

  @ViewChild('circle') private div!: ElementRef<HTMLDivElement>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.div.nativeElement.style.width = this.width;
    this.div.nativeElement.style.height = this.height;
    this.div.nativeElement.style.margin = this.margin;
    this.div.nativeElement.style.backgroundColor = this.bgColor;
  }
}
