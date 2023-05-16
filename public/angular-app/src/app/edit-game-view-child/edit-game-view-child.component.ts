import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-edit-game-view-child',
  templateUrl: './edit-game-view-child.component.html',
  styleUrls: ['./edit-game-view-child.component.css']
})
export class EditGameViewChildComponent  implements OnInit {

  @Input()
  game!:Game;

  @ViewChild('editGameForm') editGameForm!:NgForm;

  constructor() {}
  
  ngOnInit(): void {
    setTimeout(() => {
      const gameToEdit = {
        title: this.game.title,
        year: this.game.year,
        price: this.game.price,
        maxPlayers: this.game.maxPlayers,
        minPlayers: this.game.minPlayers,
        minAge: this.game.minAge,
        rate: this.game.rate
      };
      this.editGameForm.setValue(gameToEdit);
    }, 200);
  }

  onSubmit(editGameForm:NgForm){
    console.log(editGameForm.value);
  }
}