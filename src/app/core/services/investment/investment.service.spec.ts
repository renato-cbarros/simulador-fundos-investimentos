import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Investment } from 'src/app/shared/models/Investment';
import { Response } from 'src/app/shared/models/Response';

import { MOCK_RESPONSE_INVESTMENTS } from '../../../shared/mocks/response-investments.mock';

import { InvestmentService } from './investment.service';

describe('InvestmentService', () => {
  let service: InvestmentService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  const URL_GET = 'http://www.mocky.io/v3/7b2dfe42-37a3-4094-b7ce-8ee4f8012f30';

  const MOCK_RESPONSER: Response = MOCK_RESPONSE_INVESTMENTS;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(InvestmentService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(U) should be list all investments', (done) => {
    service.listInvestments().subscribe((res: Investment[]) => {
      expect(res.length).toEqual(4);
      expect(res[0].nome).toEqual('INVESTIMENTO I');
      expect(res[3].nome).toEqual('INVESTIMENTO IV');

      done();
    });

    const req = httpTestingController.expectOne(URL_GET);
    req.flush(MOCK_RESPONSER);

    expect(req.request.method).toEqual('GET');
  });

  it('(U) should get investment by name', (done) => {
    service
      .findInvestmentByName('INVESTIMENTO I')
      .subscribe((res: Investment) => {
        expect(res).toBeTruthy();
        expect(res.nome).toEqual('INVESTIMENTO I');

        done();
      });

    const req = httpTestingController.expectOne(URL_GET);
    req.flush(MOCK_RESPONSER);

    expect(req.request.method).toEqual('GET');
  });
});
