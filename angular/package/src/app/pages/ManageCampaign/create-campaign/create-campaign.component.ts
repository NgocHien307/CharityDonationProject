import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from '../../../core/service/campaign.service';
import { Campaign } from 'src/app/core/models/database/campaign.model';
import { Router } from '@angular/router';
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
  selector: 'app-create-campaign',
  imports: [MatTableModule,
        CommonModule,
        MatCardModule,
        MaterialModule,
        MatIconModule,
        MatMenuModule,
        NgxSpinnerModule,
        MatButtonModule,
        ReactiveFormsModule,],
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss'],
})
export class CreateCampaignComponent implements OnInit {
  campaignForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    // Khởi tạo form (Reactive Form)
    this.campaignForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      goalAmount: [0],
      featuredImageUrl: [''],
      creatorName: [''],
      contactEmail: [''], // nếu bạn muốn
      // Thêm các trường khác tuỳ nhu cầu...
    });
  }

  onSubmit(): void {
    if (this.campaignForm.invalid) {
      // Nếu cần, hiển thị thông báo
        alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    this.isLoading = true;

    // Lấy dữ liệu từ form
    const newCampaign: Campaign = {
      ...this.campaignForm.value,
      // Ví dụ: StartDate = new Date();
      // Bất kỳ trường nào backend yêu cầu
    };

    this.campaignService.createCampaign(newCampaign).subscribe({
      next: (res) => {
        this.isLoading = false;
        alert('Tạo chiến dịch thành công!');
        // Chuyển hướng về danh sách
        this.router.navigate(['/campaign/list']);
      },
      error: (err) => {
        this.isLoading = false;
        alert('Đã có lỗi xảy ra khi tạo campaign!');
        console.error(err);
      },
    });
  }

  onCancel(): void {
    // Quay lại trang list, hoặc reset form
    this.router.navigate(['/campaign/list']);
  }
}
