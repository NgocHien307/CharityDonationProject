import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HeaderComponent } from './app/components/header/header.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { Routes } from '@angular/router';
import { CampaignDetailComponent } from './app/components/campaign-detail/campaign-detail.component';
import {RouterModule} from '@angular/router';


const router: Routes = [
  {path: 'header', component:HeaderComponent},
  {path: 'footer', component:FooterComponent},
  {path: 'campaign-detail', component: CampaignDetailComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideRouter(router) 
  ]
}).catch((err) => console.error(err));