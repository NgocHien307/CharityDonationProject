import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/core/service/campaign.service';
import { Campaign } from 'src/app/core/models/database/campaign.model';

@Component({
  selector: 'app-view-detail-campaign',
  imports: [CommonModule, NgIf],
  standalone: true,
  templateUrl: './view-detail-campaign.component.html',
  styleUrl: './view-detail-campaign.component.scss'
})
export class ViewDetailCampaignComponent implements OnInit {
  campaign: any;
  errorMessage: string = '';
  isLoading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID từ URL:', id);  // Kiểm tra ID từ URL
    if (id) {
      this.fetchCampaignDetails(id);
    }
  }

  fetchCampaignDetails(id: string) {
    const campaignId = Number(id);
    if (isNaN(campaignId)) {
      console.error('ID không hợp lệ');
      return;
    }
    this.campaignService.getCampaignById(campaignId).subscribe({
      next: (data) => {
        console.log('Dữ liệu chiến dịch nhận được:', data);  // Kiểm tra dữ liệu nhận được từ API
        this.campaign = data;
        this.isLoading = false;  // Set loading to false khi đã có dữ liệu
      },
      error: (error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
        this.errorMessage = 'Lỗi khi tải chiến dịch, vui lòng thử lại!';
        this.isLoading = false;
      }
    });
  }

}
