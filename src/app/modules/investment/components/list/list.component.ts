import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Investment } from 'src/app/shared/models/Investment';

import { InvestmentService } from 'src/app/core/services/investment/investment.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  // Table Settings
  data$!: Observable<Investment[]>;
  columnsConfig = {
    titles: {
      nome: 'Nome',
      objetivo: 'Objetivo',
      saldoTotal: 'Saldo Total',
    },
    types: {
      nome: 'text',
      objetivo: 'text',
      saldoTotal: 'currency',
    },
    isDisabled: (indicadorCarencia: string): boolean =>
      indicadorCarencia === 'S',
    navigate: (isNavigate: boolean, nome: string) =>
      isNavigate
        ? this.router.navigate(['/investimentos/resgatar', nome])
        : undefined,
  };

  constructor(
    private router: Router,
    private investmentService: InvestmentService
  ) {}

  ngOnInit(): void {
    this.data$ = this.investmentService.listInvestments();
  }
}
