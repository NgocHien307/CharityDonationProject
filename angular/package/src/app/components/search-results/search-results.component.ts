import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router  } from '@angular/router';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CampaignService } from 'src/app/core/service/campaign.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './search-results.component.html',
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private route: ActivatedRoute, private campaignService: CampaignService,private router: Router) {}

  ngOnInit(): void {
    // Lấy query từ URL (nếu có)
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      console.log('Tìm kiếm với từ khóa:', this.searchQuery);  // Kiểm tra giá trị của searchQuery
      if (this.searchQuery) {
        this.searchCampaigns();
      }
    });
  }
  
  

  searchCampaigns(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query: this.searchQuery },
      queryParamsHandling: 'merge',
    });
  
    this.campaignService.searchCampaignsByTitle(this.searchQuery).subscribe({
      next: (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.searchResults = data;
        } else {
          this.searchResults = [];  // Không có kết quả, hiển thị thông báo
        }
      },
      error: (err) => {
        console.error('Lỗi khi gọi API:', err);
        this.searchResults = [];
      }
    });
  }
  
  
  
  
  
}
