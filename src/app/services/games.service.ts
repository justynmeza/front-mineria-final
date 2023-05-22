import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { GamesModel } from '../interfaces/games';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  private readonly url: string = environment.api

  constructor(private http: HttpClient) { }

  getAllGames(): Observable<any> {
    return this.http.get<any>(`${this.url}gameslist`);
  }

  createGame(game: GamesModel): Observable<any> {
    return this.http.post<any>(`${this.url}game/create`, game, this.options);
  }

  updateGame(game: GamesModel): Observable<any> {
    return this.http.post(`${this.url}game/update`, game, this.options);
  }

  deleteGame(gameId: any): Observable<any> {
    return this.http.post(`${this.url}game/delete`, gameId);
  }

  getAllConsoles(): Observable<any> {
    return this.http.get(`${this.url}allconsoles`);
  }

  getAllGenders(): Observable<any> {
    return this.http.get(`${this.url}allgenders`);
  }
  
  getBestFive(): Observable<any> {
    return this.http.get(`${this.url}best5`);
  }

  getBestNA(): Observable<any> {
    return this.http.get(`${this.url}bestnorthamerica`);
  }

  getBestEUR(): Observable<any> {
    return this.http.get(`${this.url}besteurope`);
  }

  getBestJP(): Observable<any> {
    return this.http.get(`${this.url}bestjapan`);
  }

  getBestROW(): Observable<any> {
    return this.http.get(`${this.url}bestrestofworld`);
  }

  getBestGlobal(): Observable<any> {
    return this.http.get(`${this.url}bestglobal`);
  }

}
