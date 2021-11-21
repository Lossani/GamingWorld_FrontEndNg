import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDeleteDialogComponent } from 'src/app/components/dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import { CreateGameExperienceDialogComponent } from 'src/app/components/dialogs/create-game-experience-dialog/create-game-experience-dialog.component';
import { ProfileService } from 'src/app/services/profile.service';
import {CreateTournamentDialogComponent} from "../../components/dialogs/create-tournament-dialog/create-tournament-dialog.component";
import {CreateTeamDialogComponent} from "../../components/dialogs/create-team-dialog/create-team-dialog.component";
import {AddMembersDialogComponent} from "../../components/dialogs/add-members-dialog/add-members-dialog.component";
import {User} from "../../entities/user-entity";
import {
  FavoriteGame, GameExperience, Profile,
  StreamerSponsor,
  StreamingCategory,
  Team,
  TournamentExperience,
  UserGame
} from "../../entities/profile-entity";
import {CreateFavoriteGameDialogComponent} from "../../components/dialogs/create-favorite-game-dialog/create-favorite-game-dialog.component";
import {CreateStreamSponsorDialogComponent} from "../../components/dialogs/create-stream-sponsor-dialog/create-stream-sponsor-dialog.component";
import {CreateStreamCategoryDialogComponent} from "../../components/dialogs/create-stream-category-dialog/create-stream-category-dialog.component";
import {SessionService} from "../../services/session.service";
import {MatTableDataSource} from "@angular/material/table";
import {Game} from "../../entities/game-entity";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit {

  // Codigo Obtenido por el route param
  profileCode!: number;
  // Datos basicos de Usuario
  user!: User;
  profile!: Profile;
  //profile!: MatTableDataSource<Profile>;
  gameExperiences!: MatTableDataSource<GameExperience>;
  favoriteGames!: MatTableDataSource<FavoriteGame>;
  tournamentExperiences!: MatTableDataSource<TournamentExperience>;
  streamingCategories!: MatTableDataSource<StreamingCategory>;
  streamerSponsors!: MatTableDataSource<StreamerSponsor>;
  // variable que guarda los nombres de las columnas que se van a mostrar
  displayedExperienceColumns: string[] = ["name", "experienceLevel", "actions"];
  // Juegos donde tiene experiencia
  displayedTournamentColumns: string[] = ["name", "position", "actions"];
  // variable que guarda los nombres de los torneos que se van a mostrar
  displayedFavoriteColumns: string[] = ["name", "actions"];
  // variable que guarda los juegos favoritos del usuario
  displayedCategoriesColums: string[] = ["name", "actions"];
  // variable que guarda las categorias de stream
  displayedSponsorColumns: string[] = ["name", "actions"];
  // variable que guarda los sponsors del streamer

  //gameExperiences!: UserGame[];
  //tournaments!: TournamentExperience[];
  teams!: Team[];

  constructor(private profileService: ProfileService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private sessionService: SessionService) { }

  /*
  getTeams()
  {
    this.profileService.getTeams(this.profileCode)
      .subscribe(Teams => {
        this.teams = Teams.map(team => {
          team.nombreFormController = new FormControl(team.name);
          team.numeroMiembrosFormController = new FormControl(team.numeroMiembros);
          return team;
        });
      });
  }
*/
  /*
  deleteTournament(element: TournamentExperience): void{
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
*/
  ngOnInit(): void {
    this.getProfileData().then();
  }

  async getProfileData()
  {
    this.user = this.sessionService.getCurrentSession().user;
    await this.profileService.getProfileByUserId(this.user.id)
      .toPromise().then((profile: Profile) => {
        this.gameExperiences = new MatTableDataSource(profile.gameExperiences);
        this.favoriteGames = new MatTableDataSource(profile.favoriteGames);
        this.tournamentExperiences = new MatTableDataSource(profile.tournamentExperiences);
        this.streamerSponsors = new MatTableDataSource(profile.streamerSponsors);
        this.streamingCategories = new MatTableDataSource(profile.streamingCategories);
        this.profile = profile;
    });
  }

  toggleEditMode(element: any): void{
    try{
      element.editMode = !element.editMode;
    } catch (e){
      return;
    }

  }
/*
  deleteExperienceInGame(element: UserGame): void{
    this.profileService.deleteGameExperience(element.id).subscribe(val => {
      this.gameExperiences = this.gameExperiences.filter(elem => (elem.id != element.id));
    });
  }
*/
/*
  saveChangedExperience(element: GameExperience): void {
    this.profile.gameExperiences.
  }
/*
  saveChangedTournament(element: TournamentExperience): void {
    this.profileService.putTournament(element, 1)
      .subscribe(res => {
        element.name = res.name;
        element.position = res.position;
        this.toggleEditMode(element);
      });
  }
*/

  openDeleteGameExperienceConfirmDialog(element: GameExperience): void{
    const confirmFunction = () => {
      this.profile.gameExperiences = this.profile.gameExperiences.filter(element => (element.id != element.id));
      this.gameExperiences.data = this.profile.gameExperiences;
    }
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        action: "Delete Game Experience?",
        confirmFunction: confirmFunction
      }
    })
  }

  openDeleteFavoriteGameConfirmDialog(element: FavoriteGame): void{
    const confirmFunction = () => {
      this.profile.favoriteGames = this.profile.favoriteGames.filter(element => (element.id != element.id));
      this.favoriteGames.data = this.profile.favoriteGames;
    }
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        action: "Delete Favorite Game?",
        confirmFunction: confirmFunction
      }
    })
  }
  openDeleteConfirmTournamentDialog(element: TournamentExperience): void{
    const confirmFunction = () => {
      this.profile.tournamentExperiences = this.profile.tournamentExperiences.filter(element => (element.id != element.id));
      this.tournamentExperiences.data = this.profile.tournamentExperiences;
    }
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        action: "Delete Tournament",
        confirmFunction: confirmFunction
      }
    })
  }

  openAddGameDialog(): void {
    const addToList = (element: GameExperience) => {
      this.profile.gameExperiences.push(element);
      this.gameExperiences.data = this.profile.gameExperiences;
    }
    const dialogRef = this.dialog.open(CreateGameExperienceDialogComponent, {
      data: {
        userId: this.profileCode,
        next: addToList
      }
    });
  }

  openAddTournamentDialog(): void {
    const addToList = (element: TournamentExperience) => {
      this.profile.tournamentExperiences.push(element);
      this.tournamentExperiences.data = this.profile.tournamentExperiences;
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
      //this.getTeams();
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

  openAddFavoriteGameDialog(): void{
    const addToList = (element: FavoriteGame) => {
      this.profile.favoriteGames.push(element);
      this.favoriteGames.data = this.profile.favoriteGames;
    }
    this.dialog.open(CreateFavoriteGameDialogComponent, {
      data: {
        userId: this.profileCode,
        next: addToList
      }
    });
  }

  openAddStreamSponsorDialog(): void{
    const addToList = (element: StreamerSponsor) => {
      this.profile.streamerSponsors.push(element);
      this.streamerSponsors.data = this.profile.streamerSponsors;
    }
    this.dialog.open(CreateStreamSponsorDialogComponent, {
      data: {
        userId: this.profileCode,
        next: addToList
      }
    });
  }

  openAddStreamCategoryDialog(): void{
    const addToList = (element: StreamingCategory) => {
      this.profile.streamingCategories.push(element);
      this.streamingCategories.data = this.profile.streamingCategories;
    }
    this.dialog.open(CreateStreamCategoryDialogComponent, {
      data: {
        userId: this.profileCode,
        next: addToList
      }
    });
  }

  /*
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


  }*/

  saveProfile(): void
  {
    this.profileService.updateProfileById(this.profile).subscribe(
      profile => {
        this.gameExperiences.data = profile.gameExperiences;
        this.favoriteGames.data = profile.favoriteGames;
        this.tournamentExperiences.data = profile.tournamentExperiences;
        this.streamerSponsors.data = profile.streamerSponsors;
        this.streamingCategories.data = profile.streamingCategories;
        this.profile = profile;

        alert("Profile saved!");
      }
    )

  }
}
