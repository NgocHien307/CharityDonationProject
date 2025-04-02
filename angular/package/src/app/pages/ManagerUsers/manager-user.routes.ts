import { Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditUserComponent } from './list-users/edit-user/edit-user.component';
// import { AddUserComponent } from './list-users/add-user/add-user.component';

export const ManagerUserRoutes: Routes = [
  // { path: '', redirectTo: 'list-users', pathMatch: 'full' },
  {
    path: '',
    component: ListUsersComponent,
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
  },
  {
    path: 'add-user',
    component: EditUserComponent,
  },
];
