import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowCardComponent } from './shadow-card.component';

describe('ShadowCardComponent', () => {
  let component: ShadowCardComponent;
  let fixture: ComponentFixture<ShadowCardComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShadowCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set default values', () => {
    expect(component.color).toEqual('primary');
    expect(component.width).toEqual('');
    expect(component.height).toEqual('');
    expect(component.text).toEqual('');
    expect(component.icon).toEqual('');
  });
});
