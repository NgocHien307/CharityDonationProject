import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';
import { CommonModule } from '@angular/common';
import { Campaign } from '../../models/campaign';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent {
  campaigns: Campaign[] = [];
  paginatedCampaigns: Campaign[] = [];

  currentPage: number = 1;
  recordsPerPage: number = 15;
  totalPages: number = 1;

  pageTitle: string = 'Danh Sách Chiến Dịch';

  search: string = "";
  unsearch: Campaign[] = [];

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.loadCampaigns();
    });
  }

  loadCampaigns() {
    this.campaignService.getAllCampaigns().subscribe(data => {
      this.campaigns = data;
      this.unsearch = data;   
      this.updatePagination();
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.campaigns.length / this.recordsPerPage);
    this.goToPage(1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.recordsPerPage;
    this.paginatedCampaigns = this.campaigns.slice(
      startIndex,
      startIndex + this.recordsPerPage
    );
  }

  campaignSearch() {
    if (!this.search) {
      this.campaigns = [...this.unsearch];
      this.updatePagination();
      return;
    }
    this.campaignService.getCampaignsByName(this.search).subscribe(data => {
      this.campaigns = data;
      this.updatePagination();
    });
  }

  deleteCampaign(id: number) {
    if (confirm('Bạn có chắc muốn xóa chiến dịch này không?')) {
      this.campaignService.deleteCampaign(id).subscribe(() => {
        this.loadCampaigns(); 
      });
    }
  }

  navigateToEdit(id: number) {
    this.router.navigate(['/campaigns/edit', id]);
  }

  navigateToCreate() {
    this.router.navigate(['/campaigns/create']);
  }
}
