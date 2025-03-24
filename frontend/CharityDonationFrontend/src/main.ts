import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HeaderComponent } from './app/components/header/header.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { Routes } from '@angular/router';


const router: Routes = [
  {path: 'header', component:HeaderComponent},
  {path: 'footer', component:FooterComponent}
];

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
