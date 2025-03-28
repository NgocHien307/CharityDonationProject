import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../../core/service/campaign.service';
import { Campaign } from 'src/app/core/models/database/campaign.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-campaign-list',
  imports: [MatTableModule,
          CommonModule,
          MatCardModule,
          MaterialModule,
          MatIconModule,
          MatMenuModule,
          NgxSpinnerModule,
          MatButtonModule,
          ReactiveFormsModule,
          ],
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];
  isLoading = false;

  constructor(
    private campaignService: CampaignService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.isLoading = true;
    this.campaignService.getAllCampaigns().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.campaigns = res;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Lỗi khi load danh sách campaign:', err);
      },
    });
  }

  onCreateCampaign(): void {
    this.router.navigate(['/campaign/create']);
  }

  onEditCampaign(id: number): void {
    this.router.navigate([`/campaign/edit/${id}`]);
  }

  onDeleteCampaign(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xoá chiến dịch này?')) {
      this.isLoading = true;
      this.campaignService.deleteCampaign(id).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Xoá thành công!');
          this.loadCampaigns();
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Lỗi xoá campaign:', err);
          alert('Xoá thất bại!');
        },
      });
    }
  }
}
