import {Component, Input, OnInit} from '@angular/core';
import {TwitchGame} from 'src/app/entities/twitch-global-stats.entity';

@Component({
  selector: 'app-twitch-bubble',
  templateUrl: './twitch-bubble.component.html',
  styleUrls: ['./twitch-bubble.component.css']
})
export class TwitchBubbleComponent implements OnInit {

  @Input()
  twitchGame!: TwitchGame;

  constructor() {
  }

  ngOnInit(): void {

  }

}
