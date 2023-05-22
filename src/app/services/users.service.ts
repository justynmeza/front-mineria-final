import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  private readonly url: string = environment.api
  
  constructor(private http : HttpClient) { }

  login = (data : any) : Observable<any> => this.http.post(`${this.url}user/login`, data);
}
