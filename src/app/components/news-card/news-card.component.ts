import { Component, Input, OnInit } from '@angular/core';
import { article } from 'src/app/entities/news-entity';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {

  @Input()
  article?: article;

  constructor() { }

  ngOnInit(): void {
  }

}
