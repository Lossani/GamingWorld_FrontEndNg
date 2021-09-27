import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GameExperience, User, UserGame } from 'src/app/entities/user-entity';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  usuario!: User;
  displayedExperienceColumns: string[] = ["name", "experienceLevel", "actions"];
  gameExperiences!: UserGame[];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getProfileById(1)
      .subscribe(User => {
        this.usuario = User;
      });
    this.profileService.getExperiencedGames(1)
      .subscribe(Games => {
        this.gameExperiences = Games.map(game => {
          game.editMode = false;
          game.experienceFormController = new FormControl(game.experienceLevel.toString());
          return game;
        });
        console.log(this.gameExperiences);
      });
  }

  toggleEditMode(element: UserGame): void{
    element.editMode = !element.editMode;
  }

  deleteExperienceInGame(element: UserGame): void{
    console.log("eliminado");
  }

}
