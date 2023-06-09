import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from '../games/games.component';
import { GamesDataService } from '../../services/games-data.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  constructor(private _router:Router, private _formBuilder:FormBuilder, private gamesService:GamesDataService){}

  addGameForm!:FormGroup;
  gameToAdd:Game = new Game("123", "sasda", 33.9);

  
  onSave(){
    this._router.navigate(["games"]);
  }

  ngOnInit(){
    // this.addGameForm = new FormGroup({
    //   title: new FormControl(),
    //   year: new FormControl(),
    //   price: new FormControl(),
    //   minPlayers: new FormControl(),
    //   maxPlayers: new FormControl(),
    //   minAge: new FormControl(),
    //   rate: new FormControl(),
    // });

    this.addGameForm = this._formBuilder.group({
      title: ["", Validators.required],
      year: "",
      price: "",
      minPlayers: "",
      maxPlayers: "",
      minAge: "",
      rate: "",
    });
  }

  onSubmit(form: FormGroup){
    console.log("Form submitted", form.value);
    this.gameToAdd = form.value;
    console.log(this.gameToAdd);
    this.gamesService.addOne(form.value).subscribe(() => {
      console.log("Game added successfully");
      this._router.navigate(["games"]);
    });
  }

  onClear(form: FormGroup){
    form.reset();
  }
}
