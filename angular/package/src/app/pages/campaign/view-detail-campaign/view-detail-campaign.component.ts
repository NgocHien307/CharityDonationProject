import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/core/service/campaign.service';
import { DonationService } from 'src/app/core/service/donation.service';
import { Campaign } from 'src/app/core/models/database/campaign.model';
import { Donation } from 'src/app/core/models/database/donation.model';
import { Creator, CreatorService } from 'src/app/core/service/creator.service';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-view-detail-campaign',
  imports: [CommonModule, NgIf, NgFor, RouterLink],
  standalone: true,
  templateUrl: './view-detail-campaign.component.html',
  styleUrls: ['./view-detail-campaign.component.scss']
})
export class ViewDetailCampaignComponent implements OnInit {
  campaign: Campaign | null = null;
  donations: Donation[] = [];
  creators: Creator[] = []; // Danh sách Creators thay vì chỉ một Creator
  errorMessage: string = '';
  isLoading: boolean = true;
  topDonors: Donation[] = [];
  latestDonors: Donation[] = [];

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private donationService: DonationService,
    private creatorService: CreatorService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchCampaignDetails(id);
      this.fetchDonations(id);
    } else {
      this.errorMessage = 'Không tìm thấy ID chiến dịch trong URL.';
      this.isLoading = false;
    }
  }

  fetchCampaignDetails(id: string) {
    const campaignId = Number(id);
    if (isNaN(campaignId)) {
      this.errorMessage = 'ID chiến dịch không hợp lệ.';
      this.isLoading = false;
      return;
    }

    this.campaignService.getCampaignById(campaignId).subscribe({
      next: (data: Campaign) => {
        this.campaign = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Lỗi khi tải chiến dịch, vui lòng thử lại!';
        this.isLoading = false;
      }
    });
  }

  fetchCreatorsDetails(creatorIds: number[]) {
    // Lấy thông tin từng Creator trong danh sách CreatorIds
    creatorIds.forEach((id) => {
      this.creatorService.getCreatorById(id).subscribe({
        next: (creator: Creator) => {
          this.creators.push(creator); // Thêm Creator vào danh sách
        },
        error: (error) => {
          console.error(`Lỗi khi lấy thông tin Creator ID ${id}:`, error);
        }
      });
    });
  }

  fetchDonations(id: string) {
    const campaignId = Number(id);
    if (isNaN(campaignId)) {
      this.errorMessage = 'ID chiến dịch không hợp lệ.';
      this.isLoading = false;
      return;
    }
  
    this.donationService.getDonationsByCampaignId(campaignId).subscribe({
      next: (donations: Donation[]) => {
        this.donations = donations;
        this.topDonors = this.getTopDonors(donations);
        this.latestDonors = this.getLatestDonors(donations);
      },
      error: (error) => {
        this.errorMessage = 'Lỗi khi tải danh sách quyên góp.';
        this.isLoading = false; 
      }
    });
  }

  calculateRemainingDays(): number {
    if (!this.campaign || !this.campaign.EndDate) {
      return 0;
    }
    const endDate = new Date(this.campaign.EndDate);
    const today = new Date();
    const timeDiff = endDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  }

  getTopDonors(donations: Donation[]): Donation[] {
    return donations
      .sort((a, b) => b.Amount - a.Amount)
      .slice(0, 10); // Lấy top 10
  }

  getLatestDonors(donations: Donation[]): Donation[] {
    return donations
      .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
      .slice(0, 10); // Lấy 10 mới nhất
  }

  getSafeSubDescription(): SafeHtml {
    if (!this.campaign || !this.campaign.SubDescription) {
      return '';
    }
    // Regex để tìm URL ảnh (hỗ trợ định dạng jpg, png, gif)
    const imageRegex = /(https?:\/\/.*\.(?:png|jpg|gif))/gi;
    // Thay thế URL bằng thẻ <img>
    const htmlContent = this.campaign.SubDescription.replace(imageRegex, '<img src="$1" alt="Ảnh minh họa" style="max-width: 100%; height: auto;" />');
    // Đảm bảo an toàn khi chèn HTML
    return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }
}