import { Component, Input } from '@angular/core';
import { SlideComponent } from './slide/slide.component';
import { DonationListComponent } from "../ManageDonation/donation-list/donation-list.component";
import { ListPartnerComponent } from '../Partner/list-partner/list-partner.component';
import { BannerComponent } from "./banner/banner.component";



@Component({
  selector: 'app-home',
  imports: [SlideComponent, DonationListComponent, BannerComponent,ListPartnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() isInHome: boolean = false;

}
