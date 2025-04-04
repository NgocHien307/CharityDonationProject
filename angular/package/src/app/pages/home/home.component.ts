import { Component } from '@angular/core';
import { SlideComponent } from './slide/slide.component';
import { DonationListComponent } from "../ManageDonation/donation-list/donation-list.component";
import { BannerComponent } from "./banner/banner.component";

@Component({
  selector: 'app-home',
  imports: [SlideComponent, DonationListComponent, BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
