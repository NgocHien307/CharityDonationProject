import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BannerComponent } from '../banner/banner.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { DonationListComponent } from '../donation-list/donation-list.component';
import { DonationCardComponent } from '../donation-card/donation-card.component';
import { PartnerComponent } from '../partner/partner.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, StatisticsComponent, DonationListComponent, PartnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
