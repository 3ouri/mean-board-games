import { Component, OnInit } from '@angular/core';
import { Game } from '../games/games.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  game!: Game;
  showEditComponent: boolean = false;

  constructor(private route:ActivatedRoute, private gameService:GamesDataService, private router: Router){
    this.game = new Game("", "", 0);
  }

  ngOnInit(): void {
    const gameId = this.route.snapshot.params["gameId"];
    this.gameService.getOne(gameId).subscribe(game => {
      this.game = game;
    });
  }

  onEdit(){
    this.showEditComponent = true;
  }

  onDelete(id:string){
    const confirmDelete = confirm("Are you sure you want to delete the selected?");
    if(confirmDelete){
      this.gameService.deleteOne(id).subscribe(()=>{
        this.router.navigate(["games"]);
      });
    }
  }

  updateGame(updatedGame:Game){
    this.game = updatedGame;
    this.showEditComponent = false;
  }
}
