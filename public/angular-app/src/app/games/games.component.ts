import { Component, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';
import { Observable, min } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];

  constructor(private gamesService:GamesDataService, private router: Router){}

  ngOnInit():void{
    this.getAll();
  }

  private getAll(){
    this.gamesService.getAll().subscribe(games => {
      this.games=games;
    });
  }

  onDelete(id:string){
    const confirmDelete = confirm("Are you sure you want to delete the selected?");
    if(confirmDelete){
      this.gamesService.deleteOne(id).subscribe(() => {
        this.getAll();
      });
    }
  }

  onAdd(){
    this.router.navigate(["games/add"]);
  }
}

export class Game {
  #_id!:string;
  #title!:string;
  #year!:number;
  #rate!:number;
  #price!:number;
  #minPlayers!:number;
  #maxPlayers!:number;
  #minAge!:number;

  get _id() {
    return this.#_id;
  }

  get title() {
    return this.#title;
  }
  
  set title(title: string){
    this.#title = title;
  }
  
  get year() {
    return this.#year;
  }

  set year(year: number) {
    this.#year = year;
  }

  get rate() {
    return this.#rate;
  }

  set rate(rate: number){
    this.rate = rate;
  }

  get price() {
    return this.#price;
  }

  set price(price: number) {
    this.#price = price;
  }

  get minPlayers() {
    return this.#minPlayers;
  }

  set minPlayers(minPlayers: number){
    this.minPlayers = minPlayers;
  }

  get maxPlayers() {
    return this.#maxPlayers;
  }

  set maxPlayers(maxPlayers: number){
    this.#maxPlayers = maxPlayers;
  }

  get minAge() {
    return this.#minAge;
  }

  set minAge(minAge: number){
    this.#minAge = minAge;
  }

  constructor(id: string, title: string, price: number){
    this.#_id = id;
    this.#title = title;
    this.#price=price;
  }

}
