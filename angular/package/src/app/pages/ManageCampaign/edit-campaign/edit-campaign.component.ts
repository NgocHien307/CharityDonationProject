import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Campaign } from 'src/app/core/models/database/campaign.model';
import { CampaignService } from 'src/app/core/service/campaign.service';
import { MaterialModule } from 'src/app/material.module';
// Thêm import service Creator
import { CreatorService, Creator } from 'src/app/core/service/creator.service'; 

interface Status {
  value: string;
  viewValue: string;
}
interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-campaign',
  // Nếu bạn KHÔNG dùng Standalone Components, bạn nên xóa `imports: [...]`
  // và khai báo trong @NgModule. Nếu bạn dùng Standalone, thêm `standalone: true,`
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    NgxSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.scss']
})
export class EditCampaignComponent implements OnInit {
  public campaignId: number;
  public campaign: Campaign = new Campaign(); 
  public statusList: Status[] = [
    { value: 'Pending', viewValue: 'Chờ duyệt' },
    { value: 'Active', viewValue: 'Hoạt động' },
    { value: 'Completed', viewValue: 'Hoàn thành' },
    { value: 'Canceled', viewValue: 'Hủy' },
  ];
  public categoryList: Category[] = [
    { value: 'Giáo dục', viewValue: 'Giáo dục' },
    { value: 'Trẻ em', viewValue: 'Trẻ em' },
    { value: 'Y tế', viewValue: 'Y tế' },
    { value: 'Xã hội', viewValue: 'Xã hội' },
  ];

  // Thêm danh sách Creator
  public creators: Creator[] = [];

  constructor(
    private spinnerService: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService,
    // inject CreatorService
    private creatorService: CreatorService
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();

    setTimeout(() => {
      // 1) Lấy ID từ URL, nếu có => load data campaign
      this.onGetUrlandCallingApi();
      // 2) Load danh sách Creator
      this.loadCreators();
      
      this.spinnerService.hide();
    }, 1000);
  }

  loadCreators(): void {
    this.creatorService.getAllCreators().subscribe({
      next: (res) => {
        this.creators = res;
      },
      error: (err) => {
        console.error('Lỗi khi load Creator:', err);
      }
    });
  }

  onGetUrlandCallingApi() {
    this.route.params.subscribe((params) => {
      this.campaignId = +params['id'];
      if (this.campaignId) {
        this.onGetData(this.campaignId);
      }
    });
  }

  onGetData(id: number) {
    // Lấy 1 campaign theo id
    this.campaignService.getCampaignById(id).subscribe((data) => {
      this.campaign = data;
      this.campaign.CreatorId = data.CreatorId;
    });
  }

  // Xử lý thay đổi input 
  onInputChange(field: string, event: any) {
    let newValue: any;

    // Nếu là select (Status, CategoryName, CreatorId)
    if (field === 'Status' || field === 'CategoryName' || field === 'CreatorId') {
      newValue = event.value;
    } else {
      // Nếu là <input (input)>
      newValue = event.target.value;
    }

    // Cập nhật object campaign
    this.campaign = { ...this.campaign, [field]: newValue };
  }

  onSubmit() {
    // Nếu có campaignId => update, ngược lại => create
    if (this.campaignId) {
      const formData = {
        ...this.campaign,
        id: this.campaignId
      };
      this.campaignService.updateCampaign(this.campaignId, formData).subscribe({
        next: () => {
          alert('Cập nhật chiến dịch thành công');
          this.router.navigate(['list-campaign']);
        },
        error: () => {
          alert('Cập nhật thất bại');
        }
      });
    } else {
      // CREATE
      const formData = { ...this.campaign };
      this.campaignService.createCampaign(formData).subscribe({
        next: () => {
          alert('Tạo chiến dịch thành công');
          this.router.navigate(['list-campaign']);
        },
        error: () => {
          alert('Tạo thất bại');
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['list-campaign']);
  }
}
