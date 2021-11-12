import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { RedeemComponent } from './redeem.component';

import { InvestmentService } from 'src/app/core/services/investment/investment.service';
import { Investment } from 'src/app/shared/models/Investment';

import { MOCK_RESPONSE_INVESTMENTS } from 'src/app/shared/mocks/response-investments.mock';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RedeemComponent', () => {
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  let component: RedeemComponent;
  let fixture: ComponentFixture<RedeemComponent>;
  let service: InvestmentService;

  const MOCK_INVESTMENT: Investment =
    MOCK_RESPONSE_INVESTMENTS.response.data.listaInvestimentos[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RedeemComponent,
        ModalComponent,
        TableComponent,
        FormComponent,
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ name: 'INVESTIMENTO I' }),
          },
        },
        { provide: Router, useValue: mockRouter },
        RedeemComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemComponent);
    service = TestBed.inject(InvestmentService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) should get investment', () => {
    spyOn(service, 'findInvestmentByName').and.returnValue(of(MOCK_INVESTMENT));

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.findInvestmentByName).toHaveBeenCalledWith('INVESTIMENTO I');
    expect(component.investment).toBeTruthy();
    expect(component.investment.nome).toEqual('INVESTIMENTO I');
  });

  it('(U) should get form value', () => {
    spyOn(service, 'findInvestmentByName').and.returnValue(of(MOCK_INVESTMENT));

    component.ngOnInit();
    fixture.detectChanges();

    spyOn(component, 'handlerValueChangesForm');

    expect(service.findInvestmentByName).toHaveBeenCalledWith('INVESTIMENTO I');

    component.formDataRedeem.controls[
      component.investment.acoes[0].nome
    ].setValue(15000);
    component.formDataRedeem.updateValueAndValidity();

    expect(component.handlerValueChangesForm).toHaveBeenCalledWith(
      component.formDataRedeem.value
    );
  });

  it('(U) should submit form invalid', () => {
    spyOn(service, 'findInvestmentByName').and.returnValue(of(MOCK_INVESTMENT));

    component.ngOnInit();
    fixture.detectChanges();

    let el = fixture.debugElement.nativeElement;

    component.formDataRedeem.controls[
      component.investment.acoes[0].nome
    ].setValue(15000);
    component.formDataRedeem.updateValueAndValidity();

    el.querySelector('#redeem-btn-confirm').click();

    // fixture.detectChanges();
    // component.dialog.getDialogById('modal-redeem')?.close('success');


    // expect(mockRouter.navigate).toHaveBeenCalledWith(['/investimentos/listar']);
  });

  it('(U) should instantiate the table settings', async () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.columnsConfig.titles).toEqual({
      nome: 'Ação',
      percentual: 'Saldo Acumulado',
      input: 'Valor a Resgatar',
    });

    expect(component.columnsConfig.types).toEqual({
      nome: 'text',
      percentual: 'currency',
      input: 'input',
    });

    expect(component.columnsConfig.isDisabled()).toEqual(false);

    expect(component.columnsConfig.navigate()).toEqual(undefined);
  });
});
