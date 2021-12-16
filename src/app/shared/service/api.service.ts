import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getCurrences(): Observable<any>{
    return this.httpClient.get<any>('https://open.er-api.com/v6/latest/USD');
  }
}
