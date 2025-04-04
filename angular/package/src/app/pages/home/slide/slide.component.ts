import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Campaign } from 'src/app/core/models/database/campaign.model';
import { CampaignService } from 'src/app/core/service/campaign.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.scss'
})
export class SlideComponent implements OnInit {

  campaigns: Campaign[] = [];
  isLoading: boolean = true;
  
  constructor(private campaignService: CampaignService, private router: Router) {}

  ngOnInit() {
    this.loadCampaigns();
  }

  loadCampaigns() {
    this.campaignService.getAllCampaigns().subscribe({
      next: (data: Campaign[]) => {
        this.campaigns = data.slice(0, 3); 
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/view-campaign-detail', id]);  
  }
  
  
}
