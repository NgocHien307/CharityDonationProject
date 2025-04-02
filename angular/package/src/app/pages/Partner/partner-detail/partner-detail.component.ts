import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartnerService } from 'src/app/core/service/partner.service';
import { CampaignService } from 'src/app/core/service/campaign.service';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Campaign } from 'src/app/core/models/database/campaign.model';

interface Partner {
  id: number;
  name: string;
  description: string;
  subDescription: string;
  logoUrl: string;
}

@Component({
  selector: 'app-partner-detail',
  imports: [CommonModule],
  templateUrl: './partner-detail.component.html',
  styleUrl: './partner-detail.component.scss',
  providers: [CurrencyPipe],
})
export class PartnerDetailComponent implements OnInit {
donate(arg0: number,arg1: string) {
throw new Error('Method not implemented.');
}
  partner!: Partner;
  campaigns: Campaign[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private partnerService: PartnerService,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id !== null) {
      this.partnerService.getPartnerById(id).subscribe({
        next: (data) => {
          this.partner = data;
          this.loadCampaigns(this.partner.id); // Load chiến dịch khi có partner
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Lỗi khi lấy dữ liệu chi tiết đối tác:', err);
          this.isLoading = false;
        }
      });
    } else {
      console.error('Không tìm thấy ID.');
      this.isLoading = false;
    }
  }

  private loadCampaigns(creatorId: number) {
    this.campaignService.getCampaignsByCreatorId(creatorId).subscribe({
      next: (data) => {
        this.campaigns = data;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách campaign:', err);
      }
    });
  }

  getProgressPercentage(collected: number, goal: number): number {
    return goal > 0 ? Math.min((collected / goal) * 100, 100) : 0;
  }

  getDaysLeft(endDate: Date | null): number {
    if (!endDate) return 0;
    const today = new Date();
    const end = new Date(endDate);
    const timeDiff = end.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
}
