import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService<T> {
  constructor(private httpClient: HttpClient) {}

  get$ = (api: string): Observable<T> =>
    this.httpClient.get<T>(`${environment.BASE_API_URL}${api}`);
}
