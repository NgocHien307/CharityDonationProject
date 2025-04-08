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
import { CampaignSubscriptionService } from 'src/app/core/service/campaign-subscription.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service'; // <-- THÊM
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-view-detail-campaign',
  imports: [CommonModule, NgIf, NgFor, RouterLink, HttpClientModule],
  standalone: true,
  templateUrl: './view-detail-campaign.component.html',
  styleUrls: ['./view-detail-campaign.component.scss']
})
export class ViewDetailCampaignComponent implements OnInit {
  campaign: Campaign | null = null;
  donations: Donation[] = [];
  creators: Creator[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  topDonors: Donation[] = [];
  latestDonors: Donation[] = [];
  userId!: number;
  campaignId!: number;
  isFollowing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private donationService: DonationService,
    private creatorService: CreatorService,
    private sanitizer: DomSanitizer,
    private subscriptionService: CampaignSubscriptionService,
    private authService: AuthenticationService // <-- THÊM
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const userId = this.authService.getUserId();

    if (!idParam || userId === null) {
      this.errorMessage = 'Không tìm thấy thông tin người dùng hoặc chiến dịch.';
      this.isLoading = false;
      return;
    }

    this.campaignId = Number(idParam);
    this.userId = userId;

    this.fetchCampaignDetails(this.campaignId);
    this.fetchDonations(this.campaignId);

    this.checkFollowStatus();
  }

  fetchCampaignDetails(id: number) {
    this.campaignService.getCampaignById(id).subscribe({
      next: (data: Campaign) => {
        this.campaign = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Lỗi khi tải chiến dịch, vui lòng thử lại!';
        this.isLoading = false;
      }
    });
  }

  fetchCreatorsDetails(creatorIds: number[]) {
    creatorIds.forEach((id) => {
      this.creatorService.getCreatorById(id).subscribe({
        next: (creator: Creator) => this.creators.push(creator),
        error: (error) => console.error(`Lỗi khi lấy thông tin Creator ID ${id}:`, error)
      });
    });
  }

  fetchDonations(id: number) {
    this.donationService.getDonationsByCampaignId(id).subscribe({
      next: (donations: Donation[]) => {
        this.donations = donations;
        this.topDonors = this.getTopDonors(donations);
        this.latestDonors = this.getLatestDonors(donations);
      },
      error: () => {
        this.errorMessage = 'Lỗi khi tải danh sách quyên góp.';
        this.isLoading = false;
      }
    });
  }

  calculateRemainingDays(): number {
    if (!this.campaign?.EndDate) return 0;
    const endDate = new Date(this.campaign.EndDate);
    const today = new Date();
    const daysDiff = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  }

  getTopDonors(donations: Donation[]): Donation[] {
    return donations.sort((a, b) => b.Amount - a.Amount).slice(0, 10);
  }

  getLatestDonors(donations: Donation[]): Donation[] {
    return donations
      .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())
      .slice(0, 10);
  }

  getSafeSubDescription(): SafeHtml {
    if (!this.campaign?.SubDescription) return '';
    const imageRegex = /(https?:\/\/.*\.(?:png|jpg|gif))/gi;
    const htmlContent = this.campaign.SubDescription.replace(
      imageRegex,
      '<img src="$1" alt="Ảnh minh họa" style="max-width: 100%; height: auto;" />'
    );
    return this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }

  checkFollowStatus() {
    this.subscriptionService.isUserFollowingCampaign(this.userId, this.campaignId).subscribe({
      next: res => this.isFollowing = res.isFollowing,
      error: err => this.isFollowing = false
    });
  }

  toggleFollow() {
    if (this.isFollowing) {
      this.subscriptionService.unfollowCampaign(this.userId, this.campaignId).subscribe({
        next: () => {
          this.isFollowing = false;
          alert("Đã hủy theo dõi chiến dịch.");
        },
        error: () => alert("Hủy theo dõi thất bại!")
      });
    } else {
      this.subscriptionService.followCampaign(this.userId, this.campaignId).subscribe({
        next: () => {
          this.isFollowing = true;
          alert("Đã theo dõi chiến dịch.");
        },
        error: err => {
          console.error('Lỗi khi theo dõi:', err);
          if (err.error && err.error.message === "Bạn đã theo dõi chiến dịch này rồi.") {
            this.isFollowing = true;
            alert("Bạn đã theo dõi chiến dịch này rồi.");
          } else {
            alert("Theo dõi thất bại!");
          }
        }
      });
    }
  }
  
  
}
