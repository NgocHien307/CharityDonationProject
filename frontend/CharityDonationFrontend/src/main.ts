import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HeaderComponent } from './app/components/header/header.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { Routes } from '@angular/router';
import { CampaignDetailComponent } from './app/components/campaign-detail/campaign-detail.component';
import {RouterModule} from '@angular/router';
import { PatnerComponent } from './app/components/patner/patner.component';
import { HomeComponent } from './app/components/home/home.component';
import { provideHttpClient } from '@angular/common/http';


const router: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: '', component:   HomeComponent},
  {path: 'header', component:HeaderComponent},
  {path: 'footer', component:FooterComponent},
  {path: 'campaign-detail/:id', component: CampaignDetailComponent },
  {path: 'patner-detail', component: PatnerComponent},
];

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideRouter(router), 
    provideHttpClient()
  ]
}).catch((err) => console.error(err));