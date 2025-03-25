import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../models/campaign';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campaign-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit {
  campaign: Campaign = {} as Campaign;
  campaignId!: number;

  selectedFile?: File;
  previewUrl?: string;

  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.campaignId = Number(this.route.snapshot.paramMap.get('id'));
    this.campaignService.getAllCampaigns().subscribe(campaigns => {
      const found = campaigns.find(c => c.id === this.campaignId);
      if (found) {
        this.campaign = found;
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Tạo preview
      const reader = new FileReader();
      reader.onload = e => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  updateCampaign() {
    if (this.campaign.collectedAmount === undefined || this.campaign.collectedAmount === null) {
      this.campaign.collectedAmount = 0;
    }
    if (this.campaign.isActive === undefined || this.campaign.isActive === null) {
      this.campaign.isActive = true;
    }
    if (!this.campaign.startDate) {
      this.campaign.startDate = new Date().toISOString();
    }
    if (this.campaign.endDate) {
      this.campaign.endDate = new Date(this.campaign.endDate).toISOString();
    } else {
      this.campaign.endDate = null;
    }
    if (this.campaign.creatorName === undefined || this.campaign.creatorName === null) {
      this.campaign.creatorName = '';
    }
    if (this.campaign.categoryName === undefined || this.campaign.categoryName === null) {
      this.campaign.categoryName = '';
    }
    
    console.log('Payload gửi đi:', this.campaign);
    this.campaignService.updateCampaign(this.campaignId, this.campaign).subscribe({
      next: (data) => {
        console.log('Chiến dịch cập nhật:', data);
        this.router.navigate(['/campaigns']);
      },
      error: (err) => console.error('Lỗi cập nhật chiến dịch:', err)
    });
  }
}
