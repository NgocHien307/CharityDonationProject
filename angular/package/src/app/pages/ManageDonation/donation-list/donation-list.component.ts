import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationCardComponent } from '../donation-card/donation-card.component';
import { CampaignService } from '../../../core/service/campaign.service';

interface Campaign {
  id: number;
  title: string;
  collectedAmount: number;
  goalAmount: number;
  featuredImageUrl: String;

}

@Component({
  selector: 'app-donation-list',
  standalone: true,
  imports: [CommonModule, DonationCardComponent],
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss']
})
export class DonationListComponent implements OnInit {
  donations: Campaign[] = []; // Danh sách đầy đủ từ API
  displayedDonations: Campaign[] = []; // Danh sách đang hiển thị
  isLoading = false ;
  errorMessage: string | null = null;
  itemsPerPage = 6; // Số lượng hiển thị mỗi lần nhấn "Xem thêm"

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
          goalAmount: c.GoalAmount ?? 0,
          featuredImageUrl: c.FeaturedImageUrl
        }));

        // Hiển thị 6 chiến dịch đầu tiên
        this.displayedDonations = this.donations.slice(0, this.itemsPerPage);
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Lỗi khi tải dữ liệu:", error);
        this.errorMessage = "Không thể tải danh sách chiến dịch!";
        this.isLoading = false;
      }
    });
  }

  showLoadMore = true;
loadMore() {
  this.isLoading = true;
  setTimeout(() => {
    // Thêm dữ liệu vào danh sách hiển thị
    const remainingItems = this.donations.slice(this.displayedDonations.length, this.displayedDonations.length + 5);
    this.displayedDonations.push(...remainingItems);
    this.isLoading = false;

    this.showLoadMore = this.displayedDonations.length < this.donations.length;
  }, 1000); // Giả lập thời gian tải
}

}
