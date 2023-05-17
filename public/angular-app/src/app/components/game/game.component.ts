import { Component, OnInit } from '@angular/core';
import { Game } from '../games/games.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesDataService } from '../../services/games-data.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  game!: Game;
  showEditComponent: boolean = false;

  constructor(private route:ActivatedRoute, private gameService:GamesDataService, private router: Router, private messageService:MessageService){
    this.game = new Game("", "", 0);
  }

  ngOnInit(): void {
    const gameId = this.route.snapshot.params["gameId"];
    this.getOne(gameId);
  }

  private getOne(gameId: any) {
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
      this.deleteOne(id);
    }
  }

  private deleteOne(id: string) {
    this.gameService.deleteOne(id).subscribe(() => {
      this.showToastMessage("Game Deleted Successfully");
      this.router.navigate(["games"]);
    });
  }

  private showToastMessage(message: string) {
    this.messageService.sendMessageAndClear(message);
  }

  updateGame(updatedGame:Game){
    this.game = updatedGame;
    this.showEditComponent = false;
    this.showToastMessage("Game Updated Successfully");
  }

  hideEditForm(boolean:Boolean){
    this.showEditComponent = false;
  }
}
