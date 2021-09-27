import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  public isInNews: boolean = false;

  searchQuery = new FormControl('');

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
