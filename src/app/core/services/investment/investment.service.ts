import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Investment } from 'src/app/shared/models/Investment';
import { Response } from 'src/app/shared/models/Response';

import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  constructor(private httpService: HttpService<Response>) {}

  listInvestments = (): Observable<Investment[]> =>
    this.httpService
      .get$('7b2dfe42-37a3-4094-b7ce-8ee4f8012f30')
      .pipe(map((res: Response) => res.response.data.listaInvestimentos));

  findInvestmentByName = (investmentName: string): Observable<Investment> =>
    this.httpService
      .get$('7b2dfe42-37a3-4094-b7ce-8ee4f8012f30')
      .pipe(
        map(
          (res: Response) =>
            res.response.data.listaInvestimentos.find(
              (inv: Investment) => inv.nome === investmentName
            ) as Investment
        )
      );
}
