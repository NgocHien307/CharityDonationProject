import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { DonationListComponent } from './components/donation-list/donation-list.component';
import { PartnerComponent } from "./components/partner/partner.component";

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
    PartnerComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CharityDonationFrontend';
}
