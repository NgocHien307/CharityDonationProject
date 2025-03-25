// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { CampaignCreateComponent } from './components/campaign-create/campaign-create.component';
import { CampaignEditComponent } from './components/campaign-edit/campaign-edit.component';
import { PaymentConfirmComponent } from './components/payment-confirm/payment-confirm.component';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';
import { HomeComponent } from './components/home/home.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/campaigns', pathMatch: 'full' },
   {path: 'home', component : HomeComponent},
  { path: 'campaigns', component: CampaignListComponent },
  { path: 'campaigns/create', component: CampaignCreateComponent },
  { path: 'campaigns/edit/:id', component: CampaignEditComponent },
  { path: 'payments/confirm/:id', component: PaymentConfirmComponent },
  { path: '**', redirectTo: '/home' }
];
