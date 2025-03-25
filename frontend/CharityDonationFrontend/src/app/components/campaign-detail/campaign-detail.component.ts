import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-campaign-detail',
  imports: [HeaderComponent, FooterComponent],
  standalone: true,
  templateUrl: './campaign-detail.component.html',
  styleUrl: './campaign-detail.component.css'
})
export class CampaignDetailComponent {

}
