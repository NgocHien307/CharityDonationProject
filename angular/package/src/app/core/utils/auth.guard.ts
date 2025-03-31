import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { UserLogged } from './user-logged';
import { RolePermissionService } from '../service/role-permission.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor( private router: Router,private rolePermission: RolePermissionService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ) {
    let userLogged: UserLogged = new UserLogged();

    if (!this.rolePermission.hasRole(['Admin', 'User'])) {
      this.router.navigate(['/home']);
      return false;
  }
  return true;
  }

}
