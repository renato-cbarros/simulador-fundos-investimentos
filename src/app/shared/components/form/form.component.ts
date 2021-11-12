import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  // Form Settings
  @Input() formConfig!: {
    formGroup: FormGroup;
    formControlName: string;
    control: AbstractControl;
    label: string;
    id: string;
  };

  constructor() {}

  ngOnInit(): void {}
}
