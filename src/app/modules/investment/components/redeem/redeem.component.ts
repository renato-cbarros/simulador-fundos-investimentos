import { Component, OnInit } from '@angular/core';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Investment } from 'src/app/shared/models/Investment';
import { Action } from 'src/app/shared/models/Action';

import { MatDialog } from '@angular/material/dialog';
import {
  DialogData,
  ModalComponent,
} from 'src/app/shared/components/modal/modal.component';

import { InvestmentService } from 'src/app/core/services/investment/investment.service';

import { FormValidations } from 'src/app/shared/components/form/form-validations';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss'],
})
export class RedeemComponent implements OnInit {
  investment!: Investment;
  totalRedeem = 0;

  formDataRedeem!: FormGroup;

  // Table Settings
  data$!: Observable<Action[]>;
  columnsConfig = {
    titles: {
      nome: 'Ação',
      percentual: 'Saldo Acumulado',
      input: 'Valor a Resgatar',
    },
    types: {
      nome: 'text',
      percentual: 'currency',
      input: 'input',
    },
    isDisabled: (): boolean => false,
    navigate: () => {},
  };

  constructor(
    private formBuilder: FormBuilder,
    private investmentService: InvestmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        take(1),
        map((data) => String(data.name).trim()),
        filter((name) => name.length > 0),
        switchMap((name) => this.investmentService.findInvestmentByName(name)),
        map((res: Investment | undefined) => {
          res?.acoes.map(
            (action: Action) =>
              (action.percentual = (action.percentual * res.saldoTotal) / 100)
          );

          return res;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.investment = res;
          this.formDataRedeemInstance();
          this.data$ = of(res.acoes);
        }
      });
  }

  formDataRedeemInstance = () => {
    let formObj: {
      [key: string]: any;
    } = {};

    this.investment.acoes.forEach((action: Action) => {
      formObj[action.id] = [
        null,
        Validators.compose([
          Validators.max(parseFloat(action.percentual.toFixed(2))),
        ]),
      ];
    });

    this.formDataRedeem = this.formBuilder.group(formObj, {
      validators: FormValidations.atLeastOneValidator,
    });
  };

  handlerValueChangesForm = (event: any) => {
    this.totalRedeem = 0;
    Object.keys(event).forEach(
      (prop: string) => (this.totalRedeem += event[prop])
    );
  };

  onSubmit = () => {
    this.formDataRedeem.markAllAsTouched();
    if (this.formDataRedeem.valid) {
      this.openDialog({
        result: 'success',
        title: 'RESGATE EFETUADO COM SUCESSO!',
        text: 'Operação realizada com sucesso!',
        btnText: 'NOVO RESGATE',
      });
    } else {
      let stringErrors = '';
      Object.keys(this.formDataRedeem.value).forEach((prop: string) => {
        if (this.formDataRedeem.controls[prop].invalid) {
          stringErrors += `${
            this.investment.acoes.find((res) => res.id === prop)?.nome
          }: O valor a resgatar não pode ser maior que ${new CurrencyPipe(
            'pt-BR',
            'R$'
          ).transform(this.formDataRedeem.controls[prop]?.errors?.max.max)}\n`;
        }
      });

      stringErrors = this.formDataRedeem.errors?.atLeastOneRequired
        .thereAreNoFilledFields
        ? 'Você deve preencher pelo menos um dos campos de valor a resgatar.'
        : `Você preencheu um ou mais campos com um valor acima do permitido: \n
      ${stringErrors}
      `;

      this.openDialog({
        result: 'error',
        title: 'DADOS INVÁLIDOS!',
        text: stringErrors,
        btnText: 'CORRIGIR',
      });
    }
  };

  openDialog(data: DialogData): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      id: 'modal-redeem',
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result === 'success') {
          this.router.navigate(['/investimentos/listar']);
        }
      });
  }
}
