import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [CommonModule,RouterModule],
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit {
  campaigns: any[] = [];

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.fetchCampaigns();
  }

  fetchCampaigns() {
    this.campaignService.getCampaigns().subscribe({
      next: (data) => {
        this.campaigns = data.slice(0, 3); // Lấy 3 chiến dịch đầu tiên
      },
      error: (error) => {
        console.error('Lỗi khi lấy dữ liệu chiến dịch:', error);
      }
    });
  }
}