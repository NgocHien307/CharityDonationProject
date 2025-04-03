import { Component, Input } from '@angular/core';
import { SlideComponent } from './slide/slide.component';
import { DonationListComponent } from "../ManageDonation/donation-list/donation-list.component";
import { ListPartnerComponent } from '../Partner/list-partner/list-partner.component';

@Component({
  selector: 'app-home',
  imports: [SlideComponent, DonationListComponent, ListPartnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() isInHome: boolean = false;

}
