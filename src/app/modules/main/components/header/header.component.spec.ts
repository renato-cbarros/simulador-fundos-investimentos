import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationStrategy } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

import { HeaderComponent } from './header.component';

class MockServices {
  // Router
  public events = of(
    new NavigationEnd(
      0,
      'http://localhost:4200/investimentos/listar',
      'http://localhost:4200/investimentos/listar'
    )
  );
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        { provide: Router, useClass: MockServices },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) should get router', async () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.currentRoute.length).toEqual(5);
  });
});
