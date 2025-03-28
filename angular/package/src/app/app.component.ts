import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserLogged } from './core/utils/user-logged';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html'
})
export class AppComponent{

  constructor(private router: Router){


  }
  title = 'Momo-Charity';

}
