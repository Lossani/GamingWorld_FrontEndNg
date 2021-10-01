import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDeleteDialogComponent } from 'src/app/components/dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { CreateGameExperienceDialogComponent } from 'src/app/components/dialogs/create-game-experience-dialog/create-game-experience-dialog.component';
import {Competencia, User, UserGame} from 'src/app/entities/user-entity';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  // Codigo Obtenido por el route param
  profileCode!: number;
  // Datos basicos de Usuario
  usuario!: User;
  // variable que guarda los nombres de las columnas que se van a mostrar
  displayedExperienceColumns: string[] = ["name", "experienceLevel", "actions"];
  // Juegos donde tiene experiencia
  displayedTournamentColumns: string[] = ["name", "date", "position", "actions"];
  // variable que guarda los nombres de los torneos que se van a mostrar


  gameExperiences!: UserGame[];
  tournaments!: Competencia[];

  constructor(private profileService: ProfileService,
              public dialog: MatDialog,
              private route: ActivatedRoute) { }

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

  getTournaments(id: number){
    this.profileService.getTournaments(id)
      .subscribe(Tournaments => {
        this.tournaments = Tournaments.map(tournament => {
          tournament.editMode = false;
          tournament.nombreFormController = new FormControl(tournament.nombre);
          tournament.puestoFormController = new FormControl(tournament.puesto);
          return tournament;

        });
        console.log(this.tournaments);
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.profileCode = data.profileCode;
      this.profileService.getProfileById(this.profileCode)
        .subscribe(User => {
          this.usuario = User;
        });
        this.getGameExperiences(this.profileCode);
        this.getTournaments(this.profileCode);
    });
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
      this.getGameExperiences(this.profileCode);
    }
    const dialogRef = this.dialog.open(CreateGameExperienceDialogComponent, {
      data: {
        userId: 1,
        next: addToList
      }
    });
  }

}
