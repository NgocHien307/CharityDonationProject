import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { DonationListComponent } from './components/donation-list/donation-list.component';
import { CampaignDetailComponent } from './components/campaign-detail/campaign-detail.component';
import { PartnerComponent } from "./components/partner/partner.component";
import { PatnerComponent } from './components/patner/patner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    StatisticsComponent,
    DonationListComponent,
    CampaignDetailComponent,
    PartnerComponent,
    PatnerComponent, 
    RouterLink
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CharityDonationFrontend';
}
