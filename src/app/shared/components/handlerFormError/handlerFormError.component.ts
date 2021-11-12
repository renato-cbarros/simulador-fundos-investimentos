import { Component, Input } from '@angular/core';
import { HandlerFormError } from './handlerFormError';

@Component({
  selector: 'app-handlerFormError',
  templateUrl: './handlerFormError.component.html',
  styleUrls: ['./handlerFormError.component.scss'],
})
export class HandlerFormErrorComponent {
  @Input() control!: any;
  @Input() label!: string;

  constructor() {}

  get errorMessage() {
    try {
      for (const propertyName in this.control.errors) {
        if (
          this.control.errors.hasOwnProperty(propertyName) &&
          this.control.touched
        ) {
          const response = HandlerFormError.getErrorMsg(
            this.label,
            propertyName,
            this.control.errors[propertyName]
          );
          return response;
        }
      }
    } catch (error) {}
    return null;
  }
}
