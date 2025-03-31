import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { HomeComponent } from './home/home.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home Page',
      urls: [
        { title: 'Home', url: '/dashboards/dashboard1' },
        { title: 'Home Page' },
      ],
    },
  },
];
