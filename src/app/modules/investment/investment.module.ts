import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from 'src/app/shared/shared.module';

import { InvestmentRoutingModule } from './investment-routing.module';
import { InvestmentComponent } from './investment.component';
import { ListComponent } from './components/list/list.component';
import { RedeemComponent } from './components/redeem/redeem.component';

@NgModule({
  declarations: [InvestmentComponent, ListComponent, RedeemComponent],
  imports: [
    CommonModule,
    InvestmentRoutingModule,
    SharedModule,

    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class InvestmentModule {}
