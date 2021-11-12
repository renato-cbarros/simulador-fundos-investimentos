import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TableComponent } from './components/table/table.component';
import { HandlerFormErrorComponent } from './components/handlerFormError/handlerFormError.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    TableComponent,
    HandlerFormErrorComponent,
    ModalComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,

    CurrencyMaskModule,
  ],
  exports: [TableComponent, ModalComponent],
})
export class SharedModule {}
