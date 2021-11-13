/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';

import { HandlerFormErrorComponent } from './handlerFormError.component';

describe('HandlerFormErrorComponent', () => {
  let component: HandlerFormErrorComponent;
  let fixture: ComponentFixture<HandlerFormErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HandlerFormErrorComponent],
      schemas: [NO_ERRORS_SCHEMA],
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

  it('(U) should return error message for invalid form', () => {
    let mockForm = new FormBuilder().group({
      field: [null, Validators.compose([Validators.max(10)])],
    });

    mockForm.controls.field.setValue(10000);
    mockForm.controls.field.markAllAsTouched();
    mockForm.controls.field.updateValueAndValidity();

    component.control = mockForm.controls.field;
    component.label = 'field';

    expect(component.errorMessage).toContain(
      'field - O valor a resgatar não pode ser maior que'
    );
  });
});
