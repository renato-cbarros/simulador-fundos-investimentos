import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'investimentos',
        loadChildren: () =>
          import('src/app/modules/investment/investment.module').then(
            (m) => m.InvestmentModule
          ),
      },
      { path: '', redirectTo: 'investimentos', pathMatch: 'full' },
      { path: '**', redirectTo: 'investimentos' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
