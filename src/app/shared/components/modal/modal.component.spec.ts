import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  const dialogMock = {
    close: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: dialogMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) should close modal', () => {
    let el = fixture.debugElement.nativeElement;

    el.querySelector('#modal-btn').click();

    expect(component.dialogRef.componentInstance).toBeFalsy();
  });
});
