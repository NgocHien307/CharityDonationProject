import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';
import { CreatorService } from '../../services/creator.service'; // Service gọi API cho Creator
import { Campaign } from '../../models/campaign';
import { Creator } from '../../models/creator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]  // đã khai báo nếu dùng standalone
})
export class CampaignCreateComponent implements OnInit {
  // Đối tượng campaign ban đầu (không thay đổi logic)
  campaign: Campaign = {
    id: 0,
    title: '',
    description: '',
    goalAmount: 0,
    collectedAmount: 0,
    isActive: false,
    startDate: '',
    endDate: '',
    featuredImageUrl: '',
    creatorId: 0,
    creatorName: '',
    categoryId: 1,
    categoryName: '',
    status: ''
  };

  formattedEndDate: string = '';
  selectedFile?: File;
  previewUrl?: string;

  // Các thuộc tính liên quan đến Creator (Quỹ)
  creators: Creator[] = [];
  selectedCreatorId: number | null = null;
  selectedCreator: Creator | null = null;

  constructor(
    private campaignService: CampaignService,
    private creatorService: CreatorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load danh sách các Creator từ API
    this.creatorService.getAllCreators().subscribe({
      next: (data) => {
        this.creators = data;
      },
      error: (err) => {
        console.error('Error loading creators:', err);
      }
    });
  }

  // Xử lý chọn file ảnh và hiển thị preview
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Khi chọn Quỹ, gọi API lấy thông tin của Creator đó và bind vào campaign
  onCreatorChange() {
    if (this.selectedCreatorId) {
      this.creatorService.getCreatorById(this.selectedCreatorId).subscribe({
        next: (data) => {
          this.selectedCreator = data;
          // Gán thông tin của Quỹ vào campaign
          this.campaign.creatorId = data.id;
          this.campaign.creatorName = data.name;
        },
        error: (err) => {
          console.error('Error fetching creator details:', err);
        }
      });
    } else {
      this.selectedCreator = null;
      this.campaign.creatorId = 0;
      this.campaign.creatorName = '';
    }
  }

  // Hàm tạo campaign
  createCampaign() {
    // Xử lý các giá trị mặc định nếu cần
    if (this.campaign.collectedAmount === undefined || this.campaign.collectedAmount === null) {
      this.campaign.collectedAmount = 0;
    }
    if (this.campaign.isActive === undefined || this.campaign.isActive === null) {
      this.campaign.isActive = true;
    }
    if (!this.campaign.startDate) {
      this.campaign.startDate = new Date().toISOString();
    }
    if (this.formattedEndDate) {
      this.campaign.endDate = new Date(this.formattedEndDate).toISOString();
    } else {
      this.campaign.endDate = null as any;
    }
    if (!this.campaign.status) {
      this.campaign.status = 'Active';
    }
    if (!this.campaign.creatorName) {
      this.campaign.creatorName = '';
    }
    if (!this.campaign.categoryName) {
      this.campaign.categoryName = '';
    }
    
    // Nếu có file ảnh được chọn thì upload file trước
    if (this.selectedFile) {
      this.campaignService.uploadFile(this.selectedFile).subscribe({
        next: (res) => {
          this.campaign.featuredImageUrl = res.fileUrl;
          this.submitCampaign();
        },
        error: (err) => console.error('Error uploading file:', err)
      });
    } else {
      // Nếu không có file, gán giá trị mặc định cho ảnh
      this.campaign.featuredImageUrl = '';
      this.submitCampaign();
    }
  }

  // Gọi API tạo chiến dịch
  submitCampaign() {
    this.campaignService.createCampaign(this.campaign).subscribe({
      next: (data) => {
        console.log('Campaign created successfully:', data);
        this.router.navigate(['/campaigns']);
      },
      error: (err) => console.error('Error creating campaign:', err)
    });
  }
}
