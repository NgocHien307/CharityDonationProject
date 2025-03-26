import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-campaign-detail',
  imports: [CommonModule,NgIf,HttpClientModule],
  standalone: true,
  providers: [CampaignService],
  templateUrl: './campaign-detail.component.html',
  styleUrl: './campaign-detail.component.css'
})
export class CampaignDetailComponent implements OnInit {
  campaign: any;

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchCampaignDetails(id);
    }
  }

  fetchCampaignDetails(id: string) {
    this.campaignService.getCampaignById(id).subscribe({
      next: (data) => {
        this.campaign = data;
      },
      error: (error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    });
  }
}
