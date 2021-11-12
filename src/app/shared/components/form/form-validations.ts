import { FormGroup, ValidationErrors } from '@angular/forms';

export class FormValidations {
  static atLeastOneValidator = (
    control: FormGroup
  ): ValidationErrors | null => {
    let controls = control.controls;

    if (controls) {
      let theOne = Object.keys(controls).findIndex(
        (key) => controls[key].value !== '' && controls[key].value
      );
      if (theOne === -1) {
        return {
          atLeastOneRequired: {
            thereAreNoFilledFields: true,
          },
        };
      }
      return null;
    }
    return null;
  };
}
