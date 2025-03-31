import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './core/utils/auth.guard';
import { CreateCampaignComponent } from './pages/ManageCampaign/create-campaign/create-campaign.component';
import { ListCampaignComponent } from './pages/ManageCampaign/list-campaign/campaign-list.component';
import { EditCampaignComponent } from './pages/ManageCampaign/edit-campaign/edit-campaign.component';
import { ListPartnerComponent } from './pages/Partner/list-partner/list-partner.component';
import { PartnerDetailComponent } from './pages/Partner/partner-detail/partner-detail.component';


export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
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
        data: { expectedRole: 'Admin' },
        loadChildren: () =>
          import('./pages/ManagerUsers/manager-user.routes').then(
            (m) => m.ManagerUserRoutes
          ),
          
      },
      {
        path: 'list-partner',
        canActivate: [AuthGuard],
        component: ListPartnerComponent
      },
      {
        path: 'partner-detail/:id', 
        canActivate: [AuthGuard],
        component: PartnerDetailComponent
      },
      {
        path: 'list-campaign',
        canActivate: [AuthGuard],
        data: { expectedRole: 'Admin' },
        children: [
          { path: '', component: ListCampaignComponent },
          { path: 'add-campaign', component: EditCampaignComponent },  
          { path: 'edit-campaign/:id', component: EditCampaignComponent } 
        ]
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
  
];
