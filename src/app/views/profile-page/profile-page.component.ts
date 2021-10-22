import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDeleteDialogComponent } from 'src/app/components/dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { CreateGameExperienceDialogComponent } from 'src/app/components/dialogs/create-game-experience-dialog/create-game-experience-dialog.component';
import {Competencia, Team, User, UserGame} from 'src/app/entities/user-entity';
import { ProfileService } from 'src/app/services/profile.service';
import {CreateTournamentDialogComponent} from "../../components/dialogs/create-tournament-dialog/create-tournament-dialog.component";
import {CreateTeamDialogComponent} from "../../components/dialogs/create-team-dialog/create-team-dialog.component";
import {AddMembersDialogComponent} from "../../components/dialogs/add-members-dialog/add-members-dialog.component";

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
  teams!: Team[];

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
      });
  }

  getTeams()
  {
    this.profileService.getTeams(this.profileCode)
      .subscribe(Teams => {
        this.teams = Teams.map(team => {
          team.nombreFormController = new FormControl(team.nombre);
          team.numeroMiembrosFormController = new FormControl(team.numeroMiembros);
          return team;
        });
      });
  }

  deleteTournament(element: Competencia): void{
    this.profileService.deleteTournament(element.id).subscribe(val => {
      this.tournaments = this.tournaments.filter(elem => (elem.id != element.id));
    });
  }

  deleteTeam(element: Team): void
  {
    this.profileService.deleteTeam(element.id).subscribe(val => {
      this.teams = this.teams.filter(elem => (elem.id != element.id));
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
        this.getTeams();
    });
  }

  toggleEditMode(element: any): void{
    try{
      element.editMode = !element.editMode;
    } catch (e){
      return;
    }

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

  saveChangedTournament(element: Competencia): void {
    this.profileService.putTournament(element, 1)
      .subscribe(res => {
        element.nombre = res.nombre;
        element.puesto = res.puesto;
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
  openDeleteConfirmTournamentDialog(element: Competencia): void{
    const confirmFunction = () => {
      this.deleteTournament(element);
    }
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        action: "Delete Tournament",
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
        userId: this.profileCode,
        next: addToList
      }
    });
  }

  openAddTournamentDialog(): void {
    const addToList = () => {
      this.getTournaments(this.profileCode);
    }
    const dialogRef = this.dialog.open(CreateTournamentDialogComponent, {
      data: {
        userId: this.profileCode,
        next: addToList
      }
    });
  }

  openAddTeamDialog(): void {
    const addToList = () => {
      this.getTeams();
    }
    this.dialog.open(CreateTeamDialogComponent, {
      data: {
        userId: this.profileCode,
        next: addToList
      }
    });
  }

  openAddMembersDialog(): void {
    const dialogRef = this.dialog.open(AddMembersDialogComponent);
  }

  openDeleteTeamConfirmDialog(element: Team) {
    const confirmFunction = () => {
      this.deleteTeam(element);
    }
   this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        action: "Delete Team",
        confirmFunction: confirmFunction
      }
    })
  }
}
