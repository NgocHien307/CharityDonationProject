import { Component, Input } from '@angular/core';
import { SlideComponent } from './slide/slide.component';
import { DonationListComponent } from "../ManageDonation/donation-list/donation-list.component";
<<<<<<< HEAD
import { ListPartnerComponent } from '../Partner/list-partner/list-partner.component';

@Component({
  selector: 'app-home',
  imports: [SlideComponent, DonationListComponent, ListPartnerComponent],
=======
import { BannerComponent } from "./banner/banner.component";

@Component({
  selector: 'app-home',
  imports: [SlideComponent, DonationListComponent, BannerComponent],
>>>>>>> d7e33c10060c810a39c7c6914669331e7033f14a
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() isInHome: boolean = false;

}
