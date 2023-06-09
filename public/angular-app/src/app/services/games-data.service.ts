import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { response } from 'express';
import { Observable, Subscription } from 'rxjs';
import { Game } from '../components/games/games.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService implements OnDestroy {

  #baseUrl:string = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  public getAll(): Observable<Game[]> {
    return this.http.get<Game[]>(this.#baseUrl + '/games?offset=20&count=10');
  }

  public getOne(id:string): Observable<Game> {
    const url: string = this.#baseUrl + "/games/" + id;
    return this.http.get<Game>(url);
  }

  public deleteOne(id:string): Observable<Game> {
    const url = this.#baseUrl + "/games/" + id;
    return this.http.delete<Game>(url);
  }

  public addOne(game:Game): Observable<Game> {
    const url = this.#baseUrl + "/games";
    return this.http.post<Game>(url, game);
  }

  public updateOne(id:string, game:Game):Observable<Game> {
    const url = this.#baseUrl + "/games/" + id;
    return this.http.patch<Game>(url, game);
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
