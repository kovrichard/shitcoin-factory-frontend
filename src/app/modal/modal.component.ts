import { Component, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'm-modal',
  host: {
    '[hidden]': 'hidden',
  },
  inputs: ['open'],
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './modal.component.html',
})
export class Modal {
  hidden = true;

  set open(value: boolean) {
    this.hidden = !value;
  }

  close(event: any) {

    this.hidden = !this.hidden;
    event.stopPropagation();
  }
}
