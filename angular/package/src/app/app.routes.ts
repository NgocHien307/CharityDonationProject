import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './core/utils/auth.guard';
import { CreateCampaignComponent } from './pages/ManageCampaign/create-campaign/create-campaign.component';
import { CampaignListComponent } from './pages/ManageCampaign/list-campaign/campaign-list.component';
import { UpdateCampaignComponent } from './pages/ManageCampaign/update-campaign/update-campaign.component';


export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'list-users',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/ManagerUsers/manager-user.routes').then(
            (m) => m.ManagerUserRoutes
          ),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
  { path: 'campaign/list',
    canActivate: [AuthGuard],
     component: CampaignListComponent },
  { path: 'campaign/create',
    canActivate: [AuthGuard], component: CreateCampaignComponent },
  { path: 'campaign/edit/:id',
    canActivate: [AuthGuard], component: UpdateCampaignComponent },
];
