import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from 'src/app/components/dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { CreateGameExperienceDialogComponent } from 'src/app/components/dialogs/create-game-experience-dialog/create-game-experience-dialog.component';
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

  constructor(private profileService: ProfileService,
              public dialog: MatDialog) { }

  getGameExperiences(id: number) {
    this.profileService.getExperiencedGames(id)
      .subscribe(Games => {
        this.gameExperiences = Games.map(game => {
          game.editMode = false;
          game.experienceFormController = new FormControl(game.experienceLevel.toString());
          return game;
        });
      });
  }

  ngOnInit(): void {
    this.profileService.getProfileById(1)
      .subscribe(User => {
        this.usuario = User;
      });
    this.getGameExperiences(1);
  }

  toggleEditMode(element: UserGame): void{
    element.editMode = !element.editMode;
  }

  deleteExperienceInGame(element: UserGame): void{
    this.profileService.deleteGameExperience(element.id).subscribe(val => {
      this.gameExperiences = this.gameExperiences.filter(elem => (elem.id != element.id));
    });
  }

  saveChangedExperience(element: UserGame): void {
    this.profileService.putGameExperience(element, 1)
      .subscribe(res => {
        element.experienceLevel = res.experienceLevel;
        this.toggleEditMode(element);
      });
  }

  openDeleteConfirmDialog(element: UserGame): void{
    const confirmFunction = () => {
      this.deleteExperienceInGame(element);
    }
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        action: "Delete Game Experience",
        confirmFunction: confirmFunction
      }
    })
  }

  openAddGameDialog(): void {
    const addToList = () => {
      this.getGameExperiences(1);
    }
    const dialogRef = this.dialog.open(CreateGameExperienceDialogComponent, {
      data: {
        userId: 1,
        next: addToList
      }
    });
  }

}
