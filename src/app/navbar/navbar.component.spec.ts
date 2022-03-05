import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Web3ModalService } from '../web3-modal/web3-modal.service';
import { Web3ModalComponent } from '../web3-modal/web3-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { NavbarComponent } from './navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        BrowserAnimationsModule,
      ],
      declarations: [NavbarComponent, Web3ModalComponent],
      providers: [Web3ModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set default values', () => {
    expect(component.darkMode).toBeFalse();
  });

  it('scroll should scroll to element', () => {
    const fakeElement: HTMLDivElement | any = {
      scrollIntoView: (settings: any) => {},
    };
    const scrollMock = spyOn(fakeElement, 'scrollIntoView');
    component.scroll(fakeElement);

    expect(scrollMock).toHaveBeenCalledOnceWith({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  });

  it('changeTheme should invert dark mode variable', () => {
    component.changeTheme();
    expect(component.darkMode).toBeTrue();
    component.changeTheme();
    expect(component.darkMode).toBeFalse();
  });
});
