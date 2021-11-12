import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './components/list/list.component';
import { RedeemComponent } from './components/redeem/redeem.component';
import { InvestmentComponent } from './investment.component';

const routes: Routes = [
  {
    path: '',
    component: InvestmentComponent,
    children: [
      {
        path: 'listar',
        component: ListComponent,
      },
      {
        path: 'resgatar/:name',
        component: RedeemComponent,
      },
      { path: '', redirectTo: 'listar', pathMatch: 'full' },
      { path: '**', redirectTo: 'listar' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentRoutingModule {}
