import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationCardComponent } from '../donation-card/donation-card.component';
import { CampaignService } from '../../../core/service/campaign.service';

interface Campaign {
  id: number;
  title: string;
  collectedAmount: number; // API trả về collectedAmount
  goalAmount: number; // API trả về goalAmount
}

@Component({
  selector: 'app-donation-list',
  standalone: true,
  imports: [CommonModule, DonationCardComponent],
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss']
})
export class DonationListComponent implements OnInit {
  donations: Campaign[] = [];
  isLoading = true;
  errorMessage: string | null = null;


  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.loadCampaigns();
  }

  
  private loadCampaigns() {
    this.campaignService.getAllCampaigns().subscribe({
      next: (data) => {
        this.donations = data.map(c => ({
          id: c.Id,
          title: c.Title,
          collectedAmount: c.CollectedAmount ?? 0, 
          goalAmount: c.GoalAmount ?? 0
        }));
  
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Lỗi khi tải dữ liệu:", error);
        this.errorMessage = "Không thể tải danh sách chiến dịch!";
        this.isLoading = false;
      }
    });
  }
  

  
}


