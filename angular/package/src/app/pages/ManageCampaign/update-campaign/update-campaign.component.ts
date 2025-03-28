import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from '../../../core/service/campaign.service';
import { Campaign } from 'src/app/core/models/database/campaign.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-campaign',
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
  templateUrl: './update-campaign.component.html',
  styleUrls: ['./update-campaign.component.scss']
})
export class UpdateCampaignComponent implements OnInit {
  campaignForm!: FormGroup;
  campaignId!: number; 
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    // Khởi tạo form
    this.campaignForm = this.fb.group({
      id: [0],
      title: [''],
      description: [''],
      goalAmount: [0],
      featuredImageUrl: [''],
      creatorName: [''],
      contactEmail: ['']
      // Thêm các trường khác nếu cần
    });

    // Lấy campaignId từ URL
    this.route.params.subscribe((params) => {
      this.campaignId = +params['id'];
      if (this.campaignId) {
        this.loadCampaignData(this.campaignId);
      }
    });
  }

  loadCampaignData(id: number) {
    this.isLoading = true;
    this.campaignService.getCampaignById(id).subscribe({
      next: (campaign: Campaign) => {
        this.isLoading = false;
        // Patch form
        this.campaignForm.patchValue({
          id: campaign.Id,
          title: campaign.Title,
          description: campaign.Description,
          goalAmount: campaign.GoalAmount,
          featuredImageUrl: campaign.FeaturedImageUrl,
          creatorName: campaign.CreatorName,
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Lỗi load campaign:', err);
      },
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    const updatedData: Campaign = {
      ...this.campaignForm.value,
    };

    this.campaignService.updateCampaign(this.campaignId, updatedData).subscribe({
      next: (res) => {
        this.isLoading = false;
        alert('Cập nhật chiến dịch thành công!');
        this.router.navigate(['/campaign/list']);
      },
      error: (err) => {
        this.isLoading = false;
        alert('Đã có lỗi xảy ra khi cập nhật!');
        console.error(err);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/campaign/list']);
  }
}
