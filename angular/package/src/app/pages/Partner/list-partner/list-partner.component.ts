import { Component, Input, OnInit } from '@angular/core';
import { PartnerService} from 'src/app/core/service/partner.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { CampaignService } from 'src/app/core/service/campaign.service';
import { PartnerCampaignsComponent } from "../partner-campaigns/partner-campaigns.component";
import { DonationListComponent } from '../../ManageDonation/donation-list/donation-list.component';
import { DonationCardComponent } from '../../ManageDonation/donation-card/donation-card.component';

@Component({
  selector: 'app-list-partner',
  imports: [CommonModule, NgxPaginationModule, RouterModule, DonationListComponent],
  templateUrl: './list-partner.component.html',
  styleUrl: './list-partner.component.scss'
})
export class ListPartnerComponent implements OnInit {
  @Input() isInHome: boolean = false;
  @Input() showDonationList: boolean = true;
  partners: any[] = [];
  isLoading = true;
  currentPage = 1; 

  constructor(private partnerService: PartnerService) {}

  ngOnInit() {
    this.partnerService.getPartners().subscribe({
      next: (data) => {
        this.partners = data.filter(p => p.isVerified);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy dữ liệu đối tác:', err);
        this.isLoading = false;
      }
    });

    

    
  }
}


