import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { UserLogged } from 'src/app/core/utils/user-logged';
import { RolePermissionService } from 'src/app/core/service/role-permission.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-topstrip',
    imports: [TablerIconsModule, MatButtonModule, MatMenuModule,RouterModule, CommonModule],
    templateUrl: './topstrip.component.html',
})
export class AppTopstripComponent {
    public userLogged = new UserLogged();
    isAdminUser: boolean = true;
    isUser: boolean = true;
    constructor(private rolePermissionService: RolePermissionService) {
        this.isAdminUser = this.rolePermissionService.hasRole(['Admin']);
      }

    logout(){
        this.userLogged.logout();
      }
}
