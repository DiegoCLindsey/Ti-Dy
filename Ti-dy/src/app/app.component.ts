import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'Ti-dy';

  constructor(public userService:UserService) {
  }

  ngOnInit(): void {

  }




}
