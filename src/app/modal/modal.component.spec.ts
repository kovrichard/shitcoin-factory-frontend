import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modal } from './modal.component';

describe('ModalComponent', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Modal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
