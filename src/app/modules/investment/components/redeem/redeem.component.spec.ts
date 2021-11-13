import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LOCALE_ID, NO_ERRORS_SCHEMA } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MockLocationStrategy } from '@angular/common/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { RedeemComponent } from './redeem.component';

import { InvestmentService } from 'src/app/core/services/investment/investment.service';
import { Investment } from 'src/app/shared/models/Investment';

import { MOCK_RESPONSE_INVESTMENTS } from 'src/app/shared/mocks/response-investments.mock';
import { SharedModule } from 'src/app/shared/shared.module';

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
      declarations: [RedeemComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        SharedModule,
      ],
      providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ name: 'INVESTIMENTO I' }),
          },
        },
        { provide: LocationStrategy, useClass: MockLocationStrategy },
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

  it('(U) should get investment', () => {
    spyOn(service, 'findInvestmentByName').and.returnValue(of(MOCK_INVESTMENT));

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.findInvestmentByName).toHaveBeenCalledWith('INVESTIMENTO I');
    expect(component.investment).toBeTruthy();
    expect(component.investment.nome).toEqual('INVESTIMENTO I');
  });

  it('(U) should render table', () => {
    spyOn(service, 'findInvestmentByName').and.returnValue(of(MOCK_INVESTMENT));

    component.ngOnInit();
    fixture.detectChanges();

    const table = fixture.debugElement.nativeElement.querySelector('.table');
    expect(table).toBeTruthy();
  });

  it('(U) should get form value', () => {
    spyOn(service, 'findInvestmentByName').and.returnValue(of(MOCK_INVESTMENT));
    spyOn(component, 'handlerValueChangesForm');

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.findInvestmentByName).toHaveBeenCalledWith('INVESTIMENTO I');

    component.formDataRedeem.controls[
      component.investment.acoes[0].id
    ].setValue(15000);
    component.formDataRedeem.updateValueAndValidity();

    expect(component.handlerValueChangesForm).toHaveBeenCalledWith(
      component.formDataRedeem.value
    );
  });

  it('(U) should calculate the total redeem', () => {
    spyOn(service, 'findInvestmentByName').and.returnValue(of(MOCK_INVESTMENT));

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.findInvestmentByName).toHaveBeenCalledWith('INVESTIMENTO I');

    component.formDataRedeem.controls[
      component.investment.acoes[0].id
    ].setValue(15000);
    component.formDataRedeem.updateValueAndValidity();

    expect(component.totalRedeem).toEqual(15000);
  });

  it('(U) should submit form without fields filled in', () => {
    spyOn(service, 'findInvestmentByName').and.returnValue(of(MOCK_INVESTMENT));

    component.ngOnInit();
    fixture.detectChanges();
    let el = fixture.debugElement.nativeElement;

    el.querySelector('#redeem-btn-confirm').click();

    const modalText = document.querySelector('.modal-text');

    expect(modalText?.textContent?.trim()).toContain(
      'Você deve preencher pelo menos um dos campos de valor a resgatar.'
    );

    component.dialog.closeAll();
  });

  it('(U) should submit form with invalid fields', () => {
    spyOn(service, 'findInvestmentByName').and.returnValue(of(MOCK_INVESTMENT));

    component.ngOnInit();
    fixture.detectChanges();

    let el = fixture.debugElement.nativeElement;

    component.formDataRedeem.controls[
      component.investment.acoes[0].id
    ].setValue(component.investment.acoes[0].percentual + 10000);
    component.formDataRedeem.updateValueAndValidity();

    el.querySelector('#redeem-btn-confirm').click();

    const modalText = document.querySelector('.modal-text');

    expect(modalText?.textContent?.trim()).toContain(
      'Você preencheu um ou mais campos com um valor acima do permitido:'
    );

    component.dialog.closeAll();
  });

  it('(U) should submit valid form', () => {
    spyOn(service, 'findInvestmentByName').and.returnValue(of(MOCK_INVESTMENT));

    component.ngOnInit();
    fixture.detectChanges();

    let el = fixture.debugElement.nativeElement;

    component.formDataRedeem.controls[
      component.investment.acoes[0].id
    ].setValue(1000);
    component.formDataRedeem.updateValueAndValidity();

    el.querySelector('#redeem-btn-confirm').click();

    const modalText = document.querySelector('.modal-text');

    expect(modalText?.textContent?.trim()).toContain(
      'Operação realizada com sucesso!'
    );

    component.dialog.getDialogById('modal-redeem')?.close('success');
    mockRouter.navigate(['/investimentos/listar']);
    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/investimentos/listar']);
  });
});
