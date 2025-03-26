import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private route: ActivatedRoute, private campaignService: CampaignService) {}

  ngOnInit(): void {
    // Lấy query từ URL
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';

      if (this.searchQuery) {
        this.searchCampaigns();
      }
    });
  }

  searchCampaigns(): void {
    this.campaignService.searchCampaignsByTitle(this.searchQuery).subscribe({
      next: (data) => this.searchResults = data,
      error: (err) => console.error('Error fetching search results:', err)
    });
  }
}
