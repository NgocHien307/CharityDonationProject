import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { UserLogged } from 'src/app/core/utils/user-logged';

@Component({
    selector: 'app-topstrip',
    imports: [TablerIconsModule, MatButtonModule, MatMenuModule,RouterModule],
    templateUrl: './topstrip.component.html',
})
export class AppTopstripComponent {
    public userLogged = new UserLogged();
    constructor() { }

    logout(){
        this.userLogged.logout();
      }
}
