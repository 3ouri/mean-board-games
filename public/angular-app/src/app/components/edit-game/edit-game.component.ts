import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../games/games.component';
import { GamesDataService } from '../../services/games-data.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent {

  @Input()
  game!:Game;

  @Output()
  updateEvent:EventEmitter<Game> = new EventEmitter<Game>();

  @Output()
  cancelEvent:EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(private gameService:GamesDataService) {}

  onSubmit(editGameForm:NgForm){
    console.log(editGameForm.value);
    this.gameService.updateOne(this.game._id, editGameForm.value).subscribe(updatedGame => {
      console.log("Updated successfully", updatedGame);
      this.updateEvent.emit(updatedGame);
    });
  }

  onCancel(){
    console.log("Cancel clicked");
    this.cancelEvent.emit(false);
  }
}
