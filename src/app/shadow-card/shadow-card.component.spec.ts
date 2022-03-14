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
    expect(component.color).toEqual('');
    expect(component.width).toEqual('');
    expect(component.height).toEqual('');
    expect(component.text).toEqual('');
    expect(component.icon).toEqual('');
  });

  it('should set input values on div', () => {
    component.width = '100px';
    component.height = '100px';
    component.color = 'black';
    component.ngAfterViewInit();

    expect(component.div.nativeElement.style.height).toEqual('100px');
    expect(component.div.nativeElement.style.backgroundColor).toEqual('black');
  });
});
