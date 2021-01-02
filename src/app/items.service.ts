import { environment } from './../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {

private readonly API = `${environment.API}pedidos`

  constructor(private http: HttpClient) { }

  listItems(): Observable<any> {
    return this.http.get(this.API)
  }
}
