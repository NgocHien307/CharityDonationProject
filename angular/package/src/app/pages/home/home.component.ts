import { Component } from '@angular/core';
import { SlideComponent } from './slide/slide.component';
import { DonationListComponent } from "../ManageDonation/donation-list/donation-list.component";

@Component({
  selector: 'app-home',
  imports: [SlideComponent, DonationListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
