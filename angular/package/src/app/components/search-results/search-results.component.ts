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
      if (this.searchQuery) {
        this.searchCampaigns();
      }
    });
  }

  searchCampaigns(): void {
    // Cập nhật URL với query tìm kiếm
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query: this.searchQuery },
      queryParamsHandling: 'merge', // Giữ lại các query params khác nếu có
    });

    // Gọi API tìm kiếm
    this.campaignService.searchCampaignsByTitle(this.searchQuery).subscribe({
      next: (data) => this.searchResults = data,
      error: (err) => console.error('Error fetching search results:', err)
    });
  }
}
