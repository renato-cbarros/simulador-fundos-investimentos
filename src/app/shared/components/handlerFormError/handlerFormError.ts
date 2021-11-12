import { CurrencyPipe } from '@angular/common';

export class HandlerFormError {
  static getErrorMsg(
    fieldName: string,
    validatorName: string,
    validatorValue?: any
  ) {
    const config = {
      max: `${fieldName} - O valor a resgatar não pode ser maior que ${new CurrencyPipe(
        'pt-BR',
        'R$'
      ).transform(validatorValue.max)}`,
    };
    return (config as any)[validatorName];
  }
}
