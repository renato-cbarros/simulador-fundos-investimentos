/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Input } from '@angular/core';

import { HandlerFormErrorComponent } from './handlerFormError.component';
import { FormControl, Validators } from '@angular/forms';

describe('HandlerFormErrorComponent', () => {
  let component: HandlerFormErrorComponent;
  let fixture: ComponentFixture<HandlerFormErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HandlerFormErrorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandlerFormErrorComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) should valid formControl', () => {

  });
});
