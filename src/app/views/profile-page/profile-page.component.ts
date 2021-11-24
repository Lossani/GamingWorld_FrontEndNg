import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {ConfirmDeleteDialogComponent} from 'src/app/components/dialogs/confirm-delete-dialog/confirm-delete-dialog.component';
import {CreateGameExperienceDialogComponent} from 'src/app/components/dialogs/create-game-experience-dialog/create-game-experience-dialog.component';
import {ProfileService} from 'src/app/services/profile.service';
import {CreateTournamentDialogComponent} from "../../components/dialogs/create-tournament-dialog/create-tournament-dialog.component";
import {User} from "../../entities/user-entity";
import {
  FavoriteGame,
  GameExperience,
  Profile,
  StreamerSponsor,
  StreamingCategory,
  Team,
  TournamentExperience,
} from "../../entities/profile-entity";
import {CreateFavoriteGameDialogComponent} from "../../components/dialogs/create-favorite-game-dialog/create-favorite-game-dialog.component";
import {CreateStreamSponsorDialogComponent} from "../../components/dialogs/create-stream-sponsor-dialog/create-stream-sponsor-dialog.component";
import {CreateStreamCategoryDialogComponent} from "../../components/dialogs/create-stream-category-dialog/create-stream-category-dialog.component";
import {SessionService} from "../../services/session.service";
import {MatTableDataSource} from "@angular/material/table";
import {GameService} from "../../services/game.service";


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
  @Input()
  profileId?: number;

  validateSession: boolean = false;


  teams!: Team[];

  constructor(private profileService: ProfileService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private gameService: GameService) {

    this.route.params.subscribe(params => {
      this.profileId = params['profileId']
      this.validateSession = this.sessionService.getCurrentSession().user.id == this.profileId;
    });
  }


  ngOnInit(): void {
    this.getProfileData().then();

  }


  async getProfileData()
  {


    let userId = this.sessionService.getCurrentSession().user.id;
    if(this.profileId!=undefined){
      userId = this.profileId;
    }
    await this.profileService.getProfileByUserId(userId)
      .toPromise().then((profile: Profile) => {
        this.gameExperiences = new MatTableDataSource(profile.gameExperiences);
        this.favoriteGames = new MatTableDataSource(profile.favoriteGames);
        this.tournamentExperiences = new MatTableDataSource(profile.tournamentExperiences);
        this.streamerSponsors = new MatTableDataSource(profile.streamerSponsors);
        this.streamingCategories = new MatTableDataSource(profile.streamingCategories);
        this.profile = profile;
        this.user = profile.user;

    });
  }

  toggleEditMode(element: any): void{
    try{
      element.editMode = !element.editMode;
    } catch (e){
      return;
    }

  }

  openDeleteGameExperienceConfirmDialog(element: GameExperience): void{
    const confirmFunction = () => {

      this.profile.gameExperiences = this.profile.gameExperiences.filter(data => { return data.gameId != element.gameId});
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
      this.profile.favoriteGames = this.profile.favoriteGames.filter(data => (data.gameId != element.gameId));
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
      this.profile.tournamentExperiences = this.profile.tournamentExperiences.filter(data => (data.name != element.name));
      this.tournamentExperiences.data = this.profile.tournamentExperiences;
    }
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        action: "Delete Tournament?",
        confirmFunction: confirmFunction
      }
    })
  }

  openAddGameDialog(): void {
    const addToList = (element: GameExperience) => {
      this.profile.gameExperiences.push(element);
      this.gameExperiences.data = this.profile.gameExperiences;
    }
    this.dialog.open(CreateGameExperienceDialogComponent, {
      data: {
        userId: this.profileCode,
        next: addToList
      }
    });
  }


  openEditFavoriteGameDialog(element: FavoriteGame): void {
    const index = this.profile.favoriteGames.indexOf(element)
    const addToList = (element: FavoriteGame) => {
      this.profile.favoriteGames[index]=element;
      this.favoriteGames.data = this.profile.favoriteGames;
    }
    const dialogRef = this.dialog.open(CreateFavoriteGameDialogComponent, {
      data: {
        userId: this.profileCode,
        editData: element,
        next: addToList
      }
    });

  }

  openEditStreamCategoryDialog(element: StreamingCategory): void {
    const index = this.profile.streamingCategories.indexOf(element)
    const addToList = (element: StreamingCategory) => {
      this.profile.streamingCategories[index]=element;
      this.streamingCategories.data = this.profile.streamingCategories;
    }
    const dialogRef = this.dialog.open(CreateStreamCategoryDialogComponent, {
      data: {
        userId: this.profileCode,
        editData: element,
        next: addToList
      }
    });
  }

  openDeleteConfirmStreamCategoryDialog(element: StreamingCategory): void{
    const confirmFunction = () => {
      this.profile.streamingCategories = this.profile.streamingCategories.filter(data => (data.name != element.name));
      this.streamingCategories.data = this.profile.streamingCategories;
    }
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        action: "Delete Stream Category?",
        confirmFunction: confirmFunction
      }
    })
  }

  openEditStreamSponsorDialog(element: StreamerSponsor): void {
    const index = this.profile.streamerSponsors.indexOf(element)
    const addToList = (element: StreamerSponsor) => {
      this.profile.streamerSponsors[index]=element;
      this.streamerSponsors.data = this.profile.streamerSponsors;
    }
    const dialogRef = this.dialog.open(CreateStreamSponsorDialogComponent, {
      data: {
        userId: this.profileCode,
        editData: element,
        next: addToList
      }
    });

  }

  openDeleteConfirmStreamSponsorDialog(element: StreamerSponsor): void{
    const confirmFunction = () => {
      this.profile.streamerSponsors = this.profile.streamerSponsors.filter(data => (data.name != element.name));
      this.streamerSponsors.data = this.profile.streamerSponsors;
    }
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {
        action: "Delete Stream Sponsor?",
        confirmFunction: confirmFunction
      }
    })
  }

  openEditTournamentDialog(element: TournamentExperience): void {
    const index = this.profile.tournamentExperiences.indexOf(element)
    const addToList = (element: TournamentExperience) => {
      this.profile.tournamentExperiences[index]=element;
      this.tournamentExperiences.data = this.profile.tournamentExperiences;
    }
    const dialogRef = this.dialog.open(CreateTournamentDialogComponent, {
      data: {
        userId: this.profileCode,
        editData: element,
        next: addToList
      }
    });

  }

  openEditGameDialog(element: GameExperience): void {
    const index = this.profile.gameExperiences.indexOf(element)
    const addToList = (element: GameExperience) => {
      this.profile.gameExperiences[index]=element;
      this.gameExperiences.data = this.profile.gameExperiences;
    }
    const dialogRef = this.dialog.open(CreateGameExperienceDialogComponent, {
      data: {
        userId: this.profileCode,
        editData: element,
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
