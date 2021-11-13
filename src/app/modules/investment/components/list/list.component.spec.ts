import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { LocationStrategy } from '@angular/common';

import { ListComponent } from './list.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';

import { InvestmentService } from 'src/app/core/services/investment/investment.service';

import { MOCK_RESPONSE_INVESTMENTS } from 'src/app/shared/mocks/response-investments.mock';
import { Investment } from 'src/app/shared/models/Investment';
import { Router } from '@angular/router';

describe('ListComponent', () => {
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: InvestmentService;

  const MOCK_INVESTMENTS: Investment[] =
    MOCK_RESPONSE_INVESTMENTS.response.data.listaInvestimentos;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent, TableComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        { provide: Router, useValue: mockRouter },
        ListComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    service = TestBed.inject(InvestmentService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(U) should get all investements', async () => {
    spyOn(service, 'listInvestments').and.returnValue(of(MOCK_INVESTMENTS));

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.listInvestments).toHaveBeenCalledWith();
    expect(await component.data$.toPromise()).toBeTruthy();

    expect((await component.data$.toPromise()).length).toEqual(4);
    expect((await component.data$.toPromise())[0].nome).toEqual(
      'INVESTIMENTO I'
    );
  });

  it('(U) should instantiate the table settings', async () => {
    spyOn(service, 'listInvestments').and.returnValue(of(MOCK_INVESTMENTS));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.columnsConfig.titles).toEqual({
      nome: 'Nome',
      objetivo: 'Objetivo',
      saldoTotal: 'Saldo Total',
    });

    expect(component.columnsConfig.types).toEqual({
      nome: 'text',
      objetivo: 'text',
      saldoTotal: 'currency',
    });

    expect(component.columnsConfig.isDisabled('S')).toEqual(true);

    expect(
      component.columnsConfig.navigate(
        false,
        (await component.data$.toPromise())[0].nome
      )
    ).toEqual(undefined);

    component.columnsConfig.navigate(
      true,
      (await component.data$.toPromise())[0].nome
    );
    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/investimentos/resgatar',
      'INVESTIMENTO I',
    ]);
  });
});
