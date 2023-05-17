import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/components/home/home.component';
import { GamesComponent } from 'src/app/components/games/games.component';
import { AddGameComponent } from 'src/app/components/add-game/add-game.component';
import { EditGameComponent } from 'src/app/components/edit-game/edit-game.component';
import { GameComponent } from 'src/app/components/game/game.component';
import { ErrorPageComponent } from 'src/app/components/error-page/error-page.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "games",
    component: GamesComponent
  },
  {
    path: "games/add",
    component: AddGameComponent
  },
  {
    path: "games/edit",
    component: EditGameComponent
  },
  {
    path: "games/:gameId",
    component: GameComponent
  },
  {
    path: "**",
    component: ErrorPageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
