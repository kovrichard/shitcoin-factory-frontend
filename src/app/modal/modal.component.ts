import { Component, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'm-modal',
  host: {
    '[hidden]': 'hidden',
  },
  inputs: ['open'],
  outputs: ['closed'],
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './modal.component.html',
})
export class Modal {
  hidden = true;
  closed: EventEmitter<any> = new EventEmitter();

  set _hidden(value: boolean) {
    this.hidden = value;
  }

  set open(value: boolean) {
    this.hidden = !value;
  }

  close(event: any) {

    this.hidden = !this.hidden;
    this.closed.next(true);
    event.stopPropagation();
  }
}
